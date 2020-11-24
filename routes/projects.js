const express = require('express');
const router = express.Router();
const db = require('../models');

//* Get all projects, no matter what category --> will return a list of all projects
//* Will return in DESC order based on the publishedAt
router.get('/', (req, res) => {
    db.Project.findAll({
        order: ['publishedAt', 'DESC']
    })
        .then(projects => {
            res.json(projects);
        })
        .catch(e => {
            console.log(e);
        })
})

//* Get all projects that haven't been completed
router.get('/notCompleted', (req, res) => {
    db.Project.findAll({
        where: {
            isCompleted: false
        }
    })
        .then(activeProjects => {
            res.json(activeProjects);
        })
        .catch(e => {
            console.log(e);
        })
})

module.exports = router;