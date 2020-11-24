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

//* Get a specific project based on its id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.Project.findOne({
        where: { id }
    })
        .then(project => {
            project ? res.json(project) : res.status(404).json({error: 'Project not found'})
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })
})


//* Patch route for updating basic project information using the project id in the parameters
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updateObject = {};
    //TODO: Will need to double check w/ front end team for these names
    const { description, title, isCompleted, publishedAt, deadline, memberLimit } = req.res;
    //TODO: May not want to make it to where the user has to submit all of these in order to create a project 
    if(!description && !title && !isCompleted && !publishedAt && !deadline && !memberLimit){
        res.status(400).json({
            error : 'Must change at least one field'
        })
    }
    const paramArray = {description, title, isCompleted, publishedAt, deadline, memberLimit};
    Object.keys(paramArray).forEach(key => {paramArray[key] ? updateObject[key] = paramArray[key] : ''})
    db.Project.update(updateObject, {
        where: {
            id
        }
    })
        then(updatedProject => {
            updatedProject && updatedProject[0] > 0 ?
                res.status(202).json({success: 'Project updated'})
            :
                res.status(404).json({error: 'Project not found'})
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred: ' + e
            })
        })
})

//* Delete Project route --> based on the project id to be deleted
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.Project.destroy({
        where: { 
            id
        }
    })
        .then(deletedProject => {
            deletedProject === 1 ?
                res.status(202).json({success: 'Project deleted'})
            :
                res.status(404).json({error: 'Project not found'})
        })
})


//* Create a new project
//? We first find the owner, then we can use the built in sequelize method to create a new project
//? for that user.
router.post('/', (req, res) => {
    //TODO: Will need to double check w/ front end team for these names
    const { description, title, isCompleted, publishedAt, deadline, memberLimit } = req.res;
    //TODO: May not want to make it to where the user has to submit all of these in order to create a project 
        if(!req.body || !description || !title || !isCompleted || !publishedAt || !deadline || !memberLimit){
            res.status(400).json({
                error : 'Please submit all required fields'
            })
        }
        //! Find the user
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user => {
            //! Once the user is found, we need to create the project
            user.createProject({
                description,
                title,
                isCompleted,
                publishedAt,
                deadline,
                memberLimit
            })
                .then(project => {
                    //! Once we create the project:
                    //! we need to use the instance of that project to create skills
                    //! send over the respective skills for an object in an array, where the skill is send as their iD?
                    const { projectSkillsArray } = req.body;
                    projectSkillsArray.forEach(skillId => {
                        db.Skill.findOne({
                            where:{id: skillId}
                        })
                            .then(skill => {
                                !skill ?
                                    res.status(404).json({error: `Skill with Id${skillId} not found`}) 
                                : 
                                //? DO WE NEED TO USE PROJECTSKILL LIKE IN THE MODEL ASSOCIATION ?
                                //? OR CAN WE JUST DO project.addSkill(skill)
                                    project.addProjectSkill(skill)
                            })
                            .catch(e => {
                                res.status(500).json({error: 'A database error: ' + e})
                            })
                    })
                    res.status(201).json(project)
                })
                .catch(e => {
                    res.status(500).json({
                        error: 'Database error occurred: ' + e
                    })
                })
        })
        .catch(e => {
            console.log(e)
        })
        
})

//* Route for adding a single team member to a already created project --> this is based on the new team members ID
//? First find the project, then find the user, then add the user to the project
router.post('/:projectId/teamMember/:userId', (req, res) => {
    const { projectId, userId } = req.params;
    db.Project.findOne({
        where:{
            id: projectId
        }
    })
        .then(project => {
            !project ? ( 
                res.status(404).json({error: 'Project not found'})
            ) : (
                db.User.findOne({
                    where: {id: userId}
                })
                    .then(user => {
                        !user ?
                            res.status(404).json({error: `user with Id${userId} not found`}) 
                        : 
                        //? DO WE NEED TO USE TeamMember LIKE IN THE MODEL ASSOCIATION ?
                        //? OR DOES SEQUELIZE AUTOMATICALLY KNOW DO THIS? I.E. we can just do
                        //? project.addUser(user) --> I think this would reset the project owner if we did it that way
                            project.addTeamMember(user)
                    })
                    .catch(e => {
                        res.status(500).json({error: 'A database error: ' + e})
                    })
            )
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })
})



module.exports = router;