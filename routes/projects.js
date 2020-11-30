const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const db = require('../models');

//* Get all projects, no matter what category --> will return a list of all projects
//* Will return in DESC order based on the publishedAt

//* Query param if you want to get all completed
//* project/?includeCompleted=true
router.get('/', (req, res) => {
    const { includeCompleted } = req.query;
    console.log(includeCompleted === 'true' ? 'withCompleted' : 'defaultScope')
    db.Project.scope(includeCompleted === 'true' ? 'withCompleted' : 'defaultScope').findAll({
        order: [['publishedAt', 'DESC']],
        include:[db.User]
    })
        .then(projects => {
            res.json(projects);
        })
        .catch(e => {
            console.log(e);
        })
})

//* Get a specific project based on the project id
//* Returns ==> the project, the owner object and an array of its members.
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.Project.findOne({
        where: { id },
        //TODO eager loading
        //TODO gets the owner and the members
        //* First one is the owner
        //* Second are the member
        //* Third are the project skills
        include: [db.User, {
            as: 'Members',
            model: db.User
        }, db.Skill]
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

//* Route for finding all the users that are interested in a project...I.E. Team Members
//? NOTE: if you want to get only pending members then you would use:
//? http://localhost:3000/api/v1/projects/${projectIdHere}/teamMember?status=pending
//? NOTE: if you want to get only approved members then you would use
//? http://localhost:3000/api/v1/projects/${projectIdHere}/teamMember?status=approved
//? NOTE: if you want to get both pending and approved members then you would use:
//? http://localhost:3000/api/v1/projects/${projectIdHere}/teamMember
//? NOTE: if you want to get pending, approved and declined members then you would use:
//? http://localhost:3000/api/v1/projects/${projectIdHere}/teamMember?status=all
//? NOTE: if you want to get only declined members then you would use:
//? http://localhost:3000/api/v1/projects/${projectIdHere}/teamMember?status=declined


router.get('/:projectId/teamMember', (req, res) => {
    const {projectId} = req.params;
    const {status} = req.query;

    db.TeamMember.scope(status ? status : 'defaultScope').findAll({
        where: {ProjectId: projectId}
    })
        .then(teamMembers => {
            res.json(teamMembers)
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })
})

//* Get all projects for a specific user --> both an owner of and a team mate of
// router.get('/user/:userId', (req, res) => {
//     const { userId } = req.params;
//     db.Project.findAll({})
// })


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
    const { description, title, isCompleted, publishedAt, deadline, memberLimit } = req.body;
    //TODO: May not want to make it to where the user has to submit all of these in order to create a project 
        if(!req.body || !description || !title || !publishedAt || !deadline || !memberLimit){
            res.status(400).json({
                error : 'Please submit all required fields',
                requests: [description, title, isCompleted, publishedAt, deadline, memberLimit]
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
            return user.createProject({
                description,
                title,
                publishedAt,
                deadline,
                memberLimit
            })
            
        })
        .then(project => {
            //! Once we create the project:
            //! we need to use the instance of that project to create skills
            //! send over the respective skills for an object in an array, where the skill is send as their iD?
            const { projectSkillsArray } = req.body;
            return db.Skill.findAll({
                where:{id: projectSkillsArray}
            })
            .then(skills => {
                if(!skills) {
                    res.status(404).json({error: `A certain skill wasn't found`}) 
                }
                return project.addSkills(skills)
                    .then(() => project)
            })
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(e => {
            console.error(e)
            res.status(500).json({error: 'A database error: ' + e})
        }) 
})

//* Route for adding skills to a project
router.patch('/:projectId/skills', (req, res) => {
    const { projectId } = req.params;
    const { projectSkillsArray } = req.body;
    db.Project.findOne({
        where: {
            id: projectId
        }
    })
        .then(project => {
            return db.Skill.findAll({
                where: {id: projectSkillsArray}
            })
                .then(skills => {
                    if(!skills){
                        res.status(404).json({error: 'A certain skill was not found'})
                    }
                    return project.addSkills(skills)
                        .then(() => project)
                })
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(e => {
            res.status(500).json({error: 'A database error: ' + e})
        })
})

//* Route for removing skills from a project
router.delete('/:projectId/skills', (req, res) => {
    const { projectId } = req.params;
    const { projectSkillsArray } = req.body;
    db.Project.findOne({
        where: {
            id: projectId
        }
    })
        .then(project => {
            return db.Skill.findAll({
                where: {id: projectSkillsArray}
            })
                .then(skills => {
                    if(!skills){
                        res.status(404).json({error: 'A certain skill was not found'})
                    }
                    return project.removeSkills(skills)
                        .then(() => project)
                })
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(e => {
            res.status(500).json({error: 'A database error: ' + e})
        })
})

//* Route for adding members to an already created project --> this is based on the new team members ID
//? First find the project, then find the user, then add the user to the project
router.post('/:projectId/teamMember', (req, res) => {
    const { projectId } = req.params;
    const { memberIdArray } = req.body;
    console.log(memberIdArray)
    db.Project.findOne({
        where:{
            id: projectId
        }
    })
        .then(project => {
            if(!project){
                res.status(404).json({error: 'Project not found'})
            }
            return db.User.findAll({
                where:{id: memberIdArray}
            })
                .then(users => {
                    if(!users){
                        res.status(404).json({error: `A certain user wasn't found`}) 
                    }
                    return project.addMembers(users)
                        .then(() => project)
                })
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })
})

//* Route for removing members from an already created project --> this is based on the team members ID
//? First find the project, then find the user, then add the user to the project
router.delete('/:projectId/teamMember', (req, res) => {
    const { projectId } = req.params;
    const { memberIdArray } = req.body;
    console.log(memberIdArray)
    db.Project.findOne({
        where:{
            id: projectId
        }
    })
        .then(project => {
            if(!project){
                res.status(404).json({error: 'Project not found'})
            }
            return db.User.findAll({
                where:{id: memberIdArray}
            })
                .then(users => {
                    if(!users){
                        res.status(404).json({error: `A certain user wasn't found`}) 
                    }
                    return project.removeMembers(users)
                        .then(() => project)
                })
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })
})

//* Route for updating the approved status for a teamMember
//? First find the project, then find the user, then update the approved status
//todo look at sequelize validation
router.patch('/:projectId/teamMember', (req, res) => {
    const { projectId } = req.params;
    const { memberId, approvedStatus } = req.body;
    
    db.TeamMember.scope('all').findOne({
        where: {
            ProjectId: projectId,
            UserId: memberId
        }
    })
        .then(member => {
            if(!member){
                res.status(404).json({error: 'Member not found'})
            }
            return member.update({approved: approvedStatus})
                .then(updatedMember => {
                    console.log(updatedMember);
                if(updatedMember) {
                    res.status(202).json({success : 'Member status updated'})
                } 
                })
        })
        .catch(e => {
            if(/SequelizeValidationError/.test(e.toString()) ){
                res.status(400).json({
                    error: e.errors[0].message
                })
            }
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })

    // db.Project.findOne({
    //     where:{
    //         id: projectId
    //     }
    // })
    //     .then(project => {
    //         if(!project){
    //             res.status(404).json({error: 'Project not found'})
    //         }
    //         return db.User.findOne({
    //             where:{id: memberId}
    //         })
    //             .then(user => {
    //                 if(!user){
    //                     res.status(404).json({error: `A certain user wasn't found`}) 
    //                 }
    //                 return project.updateMember(user, {through: {approved: approvedStatus}})
    //                     .then(() => project)
    //             })
    //     })
    //     .then(project => {
    //         res.status(201).json(project)
    //     })
  
})



module.exports = router;