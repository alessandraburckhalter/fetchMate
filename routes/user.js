var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')
const session = require('express-session')
const multer = require('multer');
const crypto = require('crypto')
const moment = require('moment')
const sendGrid = require("@sendgrid/mail");
const uploadToS3 = require('../upload-to-S3');
const { url } = require('inspector');


// const defaultPicture = require('../defaultPhoto.jpeg')

// multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

// filter types of images that multer will accept
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept a file
        console.log('file accepted')
        cb(null, true)
    } else {
        // reject a file
        console.log('file denied')
        cb(null, false)
    }

}

//stores photos to uploads folder
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



// Create User Account
router.post('/', upload.single('profilePicture'), (req, res) => {
    if (!req.body || !req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        res.status(400).json({
            error: 'Please complete all required fields'
        })
       
    }

    

    const { email, firstName, lastName, password } = req.body
    models.User.findAll({
        where:{
            email
        }
    })
    .then(user=>{
        if(user.length > 0){
            res.status(400).json({error:"Email is already being used."})
        }else{
            uploadToS3(req.file && req.file.path).then(url => {
            bcrypt.hash(password, 10, (err, hash) => {
                models.User.create({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hash,
                    profilePicture: url ? url.Location : '/uploads/default.png'
        
                })
                    .then((result) => {
                        res.status(201).json(result)
        
                    })
                    .catch((error) => {
                        res.status(404).json({
                            error: 'Email is not available.'
                        })
                    })
            })
        })
        }

})
    
})

//change password
// router.patch('/', (req,res) => {

//     const updateObject = {}
//     if(!req.body && !req.body.password){
//         res.status(400).json({
//             error: 'Please change your password'
//         })
//         return;
//     }

//     const { email, password } = req.body
//     bcrypt.hash(password, 10, (err, hash) => {
//         const params = { password:hash } 
//         Object.keys(params).forEach(key => {params[key] ? updateObject[key] = params[key] : '' })
//         models.User.update(updateObject, {
//             where: {
//                 email: req.body.email
//             }
//         })
//         .then(updatedPassword => {
//             updatedPassword && updatedPassword[0] > 0 ?
//             res.status(202).json({
//                 success: 'password updated'
//             })
//         :
//             res.status(404).json({
//                 error: 'password could not be updated'
//             })
//         })
//         .catch((e) => {
//             res.status(500).json({
//                 error: 'Database error occurred' + e
//             })
//         })
//     })
// })

//User Login
router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
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

        .then((user) => {
            if (!user) {
                res.status(404).json({
                    error: 'No user with that email.'
                })
                return;
            }

            bcrypt.compare(req.body.password, user.password, (err, matched) => {
                if (matched) {
                    // console.log(req.session.user)
                    req.session.user = user
                    res.status(201).json({
                        success: 'Yay! You are logged in.',
                        user
                    })
                } else {
                    res.status(404).json({
                        error: 'Incorrect password :('
                    })
                }
            })
        })
})

// Get All Users
router.get('/', (req, res) => {
    models.User.findAll()
        .then((user) => {
            res.json(user)
        })
})

router.get('/current', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: 'No User logged in'
        })
    }
    models.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then((user) => {
            if (user) {
                res.json({ user })
            } else {
                res.status(401).json({
                    error: 'No User logged in'
                })
            }
        })
})


//* Get specific user based on their id --> param
router.get('/:id', (req, res) => {
    const { id } = req.params;
    models.User.findOne({
        where: { id },
        include: [models.Skill]
    })
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                res.status(401).json({
                    error: `User with ID ${id} not found`
                })
            }
        })
})




//logout
router.post('/logout', (req, res) => {

    req.session.user = null
    res.status(201).json({
        success: 'Logged Out',
    })

})

//reset password 
router.post('/resetpassword', function (req, res) {
    const email = req.body.email


    models.User.findOne({
        where: { email: email }, //check if email is in the database
    })
        .then(function (user) {
            if (!user) {
                return res.status(404).json({
                    error: 'Failed to find user :('
                })
            }
            models.ResetPassword.findOne({
                where: { UserId: user.id },
            }).then(function (resetPassword) {
                if (resetPassword)
                    return resetPassword.destroy()
            }).then(() =>{

                token = crypto.randomBytes(32).toString('hex') // creates token to be sent to the forgot password
                bcrypt.hash(token, 10, function (err, hash) {
                    models.ResetPassword.create({
                        UserId: user.id,
                        token: hash,
                        expire: new Date(new Date().getTime() + 3600000).toISOString()
                    }).then(function (item) {
                        if (!item)
                            return res.status(500).json({
                                error: 'Failed to create token'
                            })
                        let mailOptions = {
                            from: "fetchmate.contact@gmail.com",
                            to: user.email,
                            subject: 'Reset your account password',
                            html: '<h4>Reset your password</h4>' +
                                '<p> To reset your password, complete this form:</p>' +
                                '<a href="' + process.env.APP_URL + '/resetpassword?userId=' + user.id + '&token=' + token + '">' + process.env.APP_URL + '/resetpassword?userId=' + user.id + '&token=' + token + '</a>' +
                                '<br><br>' +
                                '<p>--Team</p>'
                        }
                        sendGrid.setApiKey(process.env.SENDGRID_API)
                        sendGrid.send(mailOptions).then(result => {
                            if (result[0].statusCode < 400) {
                                return res.json({ success: true, message: 'Check your mail to reset your password.' })
                            } else {
                                return res.status(500).json({
                                    error: 'Failed to send email'
                                })
                            }

                        })
                    })
                })
            })
        })
})

//confirm token
router.post('/confirmtoken', function (req, res) {
    //check for user.id and token
    if (!req.body || !req.body.token || !req.body.userId) {
        res.status(401).json({
            error: 'Please complete all fields'
        })
    }

    //.then find one token by user.id
    models.ResetPassword.findOne({
        where: { UserId: req.body.userId }
    })
        .then(resetPassword => {
            if(!resetPassword){
                return res.status(404).json({
                    error:'Invalid token'
                })
            }
            //.then check token matches whats in DB
            //bcrypt compare code
            bcrypt.compare(req.body.token, resetPassword.token, (err, matched) => {
                if (matched) {
                    //if does match send back success message
                    res.status(201).json({
                        success: 'Confirmed token'
                    })
                } else {
                    //else send error message
                    res.status(404).json({
                        error: 'Invalid token'
                    })
                }
            })
        })

})

//new password route
router.patch('/newpassword', (req, res) => {
    //check for user.id, password, and token
    //.then find one token by user.id
    //CONFIRM TOKEN AGAIN
    if (req.body.password === req.body.confirmPassword) {
        res.status(400).json({
            error: 'password does not match'
        })
    }
    //.then check token matches whats in DB
    //bcrypt compare code
    const { password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        const updateObject = {
            password:hash
        }
        models.User.update(updateObject, {
            where: {
                id: req.body.userId
            }
        })
            //send success message
            .then(password => {
                password && password[0] > 0 ?
                //DESTROY TOKEN FROM RESETPASSWORD
                    models.ResetPassword.destroy({
                        where: {
                            UserId: req.body.userId 
                        }
                    })
                    .then(deletedToken => {
                        deletedToken > 0 ? res.status(202).json({success: 'password reset'}) : res.status(404).json({error: 'token invalid'})
                    })
                    :
                    res.status(404).json({
                        error: 'password could not be updated'
                    })
            })
            //else send error message
            .catch((error) => {
                res.status(404).json({
                    error: 'password is not available'
                })
            })
    })
})

module.exports = router