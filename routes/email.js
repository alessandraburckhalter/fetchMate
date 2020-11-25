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
        html: '<h1>Hello, Welcome to Fetchmate</h1>'
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
        text: "You matched",
        html: `<h1>Congraturation! You are matched with ${req.body.owner}</h1>`
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