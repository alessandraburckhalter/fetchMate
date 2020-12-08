const express = require('express');
const router = express.Router();
const db = require('../models');
const sendGrid = require("@sendgrid/mail")



router.get('/', (req, res) => {
    res.send('API Status: Fetchmate is awesome')
});

//welcome email for register
router.post('/welcome', (req, res) => {
    sendGrid.setApiKey(process.env.SENDGRID_API)
    const msg = {
        to: req.body.email,
        from: "fetchmate.contact@gmail.com",
        subject: 'Welcome to fetchMate',
        text: "Hello from fetchMate",
        html: '<h4>Hi there, <br/> Welcome to fetchMate! <br/> Thanks for creating an accout. We are so happy to see you here. <br/>Now, log in and start publishing and/or searching projects!<br/><br/> Have an awesome day,<br> fetchMate team</h4>'
    }
    // console.log(req.body.email)
    sendGrid.send(msg)
        .then(result => {
            
            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            // console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});


// matching email 
router.post('/matched', (req, res) => {

    console.log(req.body);

    sendGrid.setApiKey(process.env.SENDGRID_API)
    const msg = {
        to: req.body.email,
        from: "fetchmate.contact@gmail.com",
        subject: 'You matched with ' + req.body.owner,
        text: "You matched" + req.body.ownerName,
        html: `<h4>Congraturations! You were accepted. You can now start working with ${req.body.ownerName}(${req.body.owner}) on project(${req.body.projectTitle}). Log in and start chatting.</h4>`
    }

    sendGrid.send(msg)
        .then(result => {

            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});


router.post('/declined', (req, res) => {

    sendGrid.setApiKey(process.env.SENDGRID_API)
    const msg = {
        to: req.body.email,
        from: "fetchmate.contact@gmail.com",
        subject: 'You were declined. ' ,
        text: "You matched" ,
        html: `<h4>We are sorry 😔 <br/> You were not accepted to work on project(${req.body.projectTitle}). <br/> Please, don't give up. Log in again and apply for other projects. We are sure you will find the perfect fit for you.</h4>`
    }

    sendGrid.send(msg)
        .then(result => {

            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});

router.post('/contact', (req, res) => {
    sendGrid.setApiKey(process.env.SENDGRID_API)
    const msg = {
        to: "fetchmate.contact@gmail.com",
        from: "fetchmate.contact@gmail.com",
        reply_to: req.body.email,
        subject: req.body.subject ,
        text: "You matched" ,
        html: `<h3>Message from:${req.body.name}(${req.body.email})</h3>` + `<br/>` +  `<h3>message:</h3>` + `<h3>${req.body.message}</h3>`
    }

    sendGrid.send(msg)
        .then(result => {

            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});

module.exports = router;