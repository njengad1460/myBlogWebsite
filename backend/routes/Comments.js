const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require ('../models/User')
const post = require('./Post')
const Comment = require('./Comments')
const verifyToken = require('../verifyToken')

// creating a comment

router.post ("/create", verifyToken, async(req, res) =>{
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(err)
    }
})

// update 
router.put('/:id', verifyToken, async(req, res) =>{
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:reqbody}, {new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500)
    }
})

// deleting a comment
router.delete("/:id", async(req, res) =>{
    try {
        await Comment.findById(req.params.id)
        res.status(200).json("comment deleted")
    } catch (error) {
        res.status(500).json(err)
    }
})

// get comment
router.get("/post/:postId", async(req, res) =>{
    try {
        const comment = await Comment.find({postId: req.params.postId})
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router