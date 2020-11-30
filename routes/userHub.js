var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt') 
const session = require('express-session')
const multer = require('multer');
const checkAuth = require('../checkAuth');
const db = require('../models');

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
router.patch('/', checkAuth, (req,res) => {
    
    const updateObject = {}
    if(!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password && !req.body.profilePicture ){
        res.status(400).json({
            error: 'Please pick a field to change'
        })
        return ;
    } 

    const { firstName, lastName, email, password, profilePicture } = req.body
    const params = { firstName, lastName, password, profilePicture, email }
    Object.keys(params).forEach(key => {params[key] ? updateObject[key] = params[key] : ''})
    models.User.update(updateObject, {
        where: {
            id: req.session.user.id
        }
    })
        .then((updated) => {
            updated && updated[0] > 0 ?
                res.status(202).json({
                    success: 'profile updated'
                })
            :
                res.status(404).json({
                    error: 'Profile not found'
                })
        })
        .catch((e) => {
            res.status(500).json({
                error: 'Database error occurred' + e
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
                    return user.addSkills(skills)
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

module.exports = router
