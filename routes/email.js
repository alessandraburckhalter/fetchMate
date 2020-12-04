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
        subject: 'Welcome to Fetchmate',
        text: "Hello from Fetchmate",
        html: '<h4>Hello, Welcome to Fetchmate</h4>'
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
        html: `<h4>Congraturation! You were accepted. You can start working with ${req.body.ownerName}(${req.body.owner}) on project(${req.body.projectTitle})</h4>`
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
        html: `<h4>We are sorry😔  You were not accepted to work on project(${req.body.projectTitle}) Don't give up. LogIn again and apply for other projects.</h4>`
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
        from: req.body.email,
        subject: req.body.subject ,
        text: "You matched" ,
        html: `<h4>Message from:${req.body.name} \n message:${req.body.message}</h4>`
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