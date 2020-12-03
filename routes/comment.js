const express = require('express');
const router = express.Router();
const db = require('../models');

router.patch('/:commentId',(req,res)=>{
    const {commentId} = req.params
    if(!req.body || !req.body.content){
        res.status(400).json({
            error: "Please Submit all required fields"
        })
        return;
    }
    db.Comment.update({
        content: req.body.content
    },{
        where:{
            id: commentId
        }
    })
    .then(updated=>{
        if(updated && updated[0] === 1){
            res.status(202).json({
                success: "comment Updated"
            })
        }else{
            res.status(404).json({
                error: "comment not found"
            })
        }
    })
    .catch(e=>{
        res.status(500).json({
            error: "Database error occurred"
        })
    })
})
router.delete("/:commentId", (req, res)=>{
    db.Comment.destroy({
        where:{
          id: req.params.commentId
        }
      })
        .then(deleted=>{
          if(deleted === 1){
            res.status(202).json({
              success: "Comment deleted"
            })
          }else{
            res.status(404).json({
              error: "Comment Not Found"
            })
          }
          
        })
  })

module.exports = router;