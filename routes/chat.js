const express = require('express');
const router = express.Router();
const db = require('../models');

//* Get all chat messages
router.get('/', (req, res) => {

})

//* Get all chat messages for a specific project group
router.get('/:projectId', (req, res) => {
    const { projectId } = req.params;
    db.Chat.findAll({
        where: {ProjectId : projectId}
    })
        .then(chatMessages => {
            res.json(chatMessages);
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred' + e
            })
        })
})


module.exports = router;