var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt') 
const session = require('express-session')
const multer = require('multer');
// const defaultPicture = require('../defaultPhoto.jpeg')

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

//stores photos to uploads folder
const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// Create User Account
router.post('/',upload.single('profilePicture'), (req,res) => {
    if(!req.body || !req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName){
        res.status(400).json({
            error: 'Please complete all required fields'
        })
        return;
    }

    const { email, firstName, lastName, password } = req.body

    
    bcrypt.hash(password, 10, (err, hash) => {
        models.User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash,
            profilePicture: req.file && req.file.path ? req.file.path : null
            
        })
        .then((result) => {
            res.status(201).json(result)
            
        })
        .catch((error) => {
            res.status(404).json({
                error: 'Email is not available'
            })
        })
    })
})


//User Login
router.post('/login', (req,res) => {
    if(!req.body.email || !req.body.password){
        res.status(400).json({
            error: 'Please complete all required fields'
        })
        return;
    }

    models.User.scope('withPassword').findOne({
        where: {
            email: req.body.email
        }
    })

    .then((user)=> {
        if(!user){
            res.status(404).json({
                error: 'No user with that email'
            })
            return;
        }

        bcrypt.compare(req.body.password, user.password, (err, matched) => {
            if(matched){
                // console.log(req.session.user)
                req.session.user = user
                res.status(201).json({
                    success: 'Logged In',
                    user
                })
            }else{
                res.status(404).json({
                    error: 'Incorrect password'
                })
            }
        })
    })
})

// Get All Users
router.get('/', (req,res) => {
    models.User.findAll()
    .then((user) => {
        res.json(user)
    })
})

//* Get specific user based on their id --> param
router.get('/:id', (req,res) => {
    const { id } = req.params;
    models.User.findOne({
        where: { id },
        include: [db.Skill]
    })
    .then((user) =>{
        if(user){
            res.json(user)
        }else {
            res.status(401).json({
                error:`User with ID ${id} not found`
            })
        }
    })
})


//logout
router.post('/logout', (req,res) => {
    
    req.session.user = null
    res.status(201).json({
        success: 'Logged Out',
    })

})

module.exports = router