var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt') 
const session = require('express-session')
const multer = require('multer');
const checkAuth = require('../checkAuth');
const db = require('../models');
const uploadToS3 = require('../upload-to-S3');


// multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

// filter types of images that multer will accept
const fileFilter = (req,file,cb) => {
    
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // accept a file
        console.log('file accepted')
        cb(null, true)
    }else{
        // reject a file
        console.log('file denied')
        cb(null, false)
    }
    
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//get profile
//* Added a section that includes the projects that the current user owns and is a teamMember of
router.get('/current', checkAuth, (req,res) => {
    models.User.findOne({
        where: {
            id: req.session.user.id
        },
        include: [
            {
                primaryKey: 'owner',
                model: db.Project,
                required: false,
                include:[
                    db.Skill
                ]
            },
            {
                as: "MemberProjects", 
                model: db.Project,
                required: false,
                include:[
                    db.Skill
                ]
            },
                db.Skill]
    })
    .then((user) =>{
        if(user){
            res.json(user)
        }else {
            res.status(401).json({
                error:'No User logged in'
            })
        }
    })
})


// all info by user id
router.get('/user/:id', checkAuth, (req,res) => {
    const {id} = req.params
    models.User.findOne({
        where: {
            id
        },
        include: [
            {
                primaryKey: 'owner',
                model: db.Project,
                required: false,
            },
            {
                as: "MemberProjects", 
                model: db.Project,
                required: false
            },
                db.Skill]
    })
    .then((user) =>{
        if(user){
            res.json(user)
        }else {
            res.status(401).json({
                error:'No User logged in'
            })
        }
    })
})

//update profile PUT
// router.put('/', checkAuth, (req,res) => {
//     models.User.findOne({
//         where: {
//             id: req.session.user.id
//         }
//     })
        
//     .then((user)=>{
//         user.update({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName
//         })

//         .then((result) => {
//             res.status(201).json(result)
//         })
//     })
// })

//update profile
router.patch('/',upload.single('profilePicture'), checkAuth, (req,res) => {
    
    const updateObject = {}
    if(!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password &&  !req.body.title && !req.file){
        res.status(400).json({
            error: 'Please pick a field to change'
        })
    } 

    const { firstName, lastName, email, password, title, userSkillsArray } = req.body
    let  profilePicture  = req.file && req.file.path ? "/" + req.file.path : null
    const params = { firstName, lastName, password, profilePicture, email, title }
    
    uploadToS3(req.file && req.file.path).then(url => {
        console.log(url)
        if (url) {
            params.profilePicture = url.Location
            
        }
        Object.keys(params).forEach(key => {params[key] ? updateObject[key] = params[key] : ''})
        console.log(params)
        models.User.update(updateObject, {
            where: {
                id: req.session.user.id
            }
        })
            .then((updated) => {
                if(updated && updated[0] > 0){
                    return updated
                }else{
                    res.status(404).json({
                        error: 'Profile not found'
                    })
                }
            })
            .then(updated => {
                return db.User.findOne({
                    where: {
                        id: req.session.user.id
                    }
                })
                    .then(user => user)
            })
            .then(user => {
                return db.Skill.findAll({
                    where: {id: userSkillsArray}
                })
                    .then(skills => {
                        if(!skills){
                            res.status(404).json({error: 'A certain skill wasn\'t found'})
                        }
                        return user.setSkills(skills)
                            .then(() => user)
                    })
            })
            .then(user => {
                res.status(201).json({success: 'User updated'})
            })
            .catch((e) => {
                res.status(500).json({
                    error: 'Database error occurred' + e
                })
            })
        })
    
})

//* Add skill(s) to the currently logged in user --> send over as an array of the skillId's
router.post('/userSkill', checkAuth, (req, res) => {
    const { userSkillsArray } = req.body;
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user => {
            return db.Skill.findAll({
                where: {id: userSkillsArray}
            })
                .then(skills => {
                    if(!skills){
                        res.status(404).json({error: 'A certain skill wasn\'t found'})
                    }
                    return user.setSkills(skills)
                        .then(() => user)
                })
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(e => {
            res.status(500).json({error: 'A database error: ' + e})
        })
})

//* Remove skill(s) to the currently logged in user --> send over as an array of the skillId's
router.delete('/userSkill', checkAuth, (req, res) => {
    const { userSkillsArray } = req.body;
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user => {
            return db.Skill.findAll({
                where: {id: userSkillsArray}
            })
                .then(skills => {
                    if(!skills){
                        res.status(404).json({error: 'A certain skill wasn\'t found'})
                    }
                    return user.removeSkills(skills)
                        .then(() => user)
                })
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(e => {
            res.status(500).json({error: 'A database error: ' + e})
        })
})

router.delete('/:userId', (req, res) => {
    db.User.destroy({
        where:{
          id: req.params.userId
        }
      })
        .then(deleted=>{
          if(deleted === 1){
            res.status(202).json({
              success: "Account deleted"
            })
          }else{
            res.status(404).json({
              error: "Account Not Found"
            })
          }
          
        })
})

module.exports = router
