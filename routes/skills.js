const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require("sequelize");

// const { Op } = require('sequelize');

//* Get all skills, no matter what category --> will return a list of all skills
router.get('/', (req, res) => {
    db.Skill.findAll()
        .then(skills => {
            res.json(skills)
        })
        .catch(e => {
            console.log(e)
        })
})

//* Get all skills for a specific category --> will return list of skills for a category name
router.get('/:category', (req, res) => {
    const { category } = req.params;
    db.Skill.findAll({
        where: { category }
    })
        .then(skills => {
            res.json(skills)
        })
        .catch(e => {
            console.log(e)
        })
})

//* Create a new skill and return the newly created skill back as JSON
router.post('/', (req, res) => {
    if(!req.body || !req.body.name || !req.body.category){
        res.status(400).json({
            error : 'Please submit all required fields'
        })
    }
    const { name, category } = req.body;
    db.Skill.findAll({
        where:{
            name: {
                [Op.iLike]: name
            }
        }
    })
        .then(skillsFound => {
            console.log(skillsFound)
            if(skillsFound.length === 0){
                db.Skill.create({
                    name,
                    category
                })
                    .then(skill => {
                        res.status(201).json(skill)
                    })
            }else{
                res.status(400).json({
                    error : 'Skill already exists:'
                })
            }
        })
        .catch(e => {
            res.status(500).json({
                error : 'Database error occurred: ' + e
            })
        })

})

//* Update a skills information based on the id of the skill
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updateObject = {};
    if(!req.body.name && !req.body.category){
        res.status(400).json({
            error: 'Must change at least one field'
        })
    }
    const { name, category } = req.body;
    const paramArray = { name, category }
    Object.keys(paramArray).forEach(key => {paramArray[key] ? updateObject[key] = paramArray[key] : ''})
    db.Skill.update(updateObject, {
        where:{
            id
        }
    })
        .then(updated => {
            updated && updated[0] > 0 ? 
                res.status(202).json({success : 'Skill updated'}) 
            : 
                res.status(404).json({error: 'Skill not found'})
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred'
            })
        })
})

//* Delete a skill based on the id of that skill
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.Skill.destroy({
        where: { id }
    })
        .then(deletedSkill => {
            deletedSkill === 1 ? 
                res.status(202).json({success : 'Skill deleted'}) 
            : 
                res.status(404).json({error: 'Skill not found'})
        })
})

module.exports = router;