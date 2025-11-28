const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require ('../models/User')
const Post = require('./Post')
const Comment = require('./Comments')
const verifyToken = require('../verifyToken')

// creating a post

router.post ("/create", verifyToken, async(req, res) =>{
    try {
        const newPost = new Comment(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(err)
    }
})

// update 
router.put('/:id', verifyToken, async(req, res) =>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:reqbody}, {new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500)
    }
})

// deleting a post
router.delete("/:id", async(req, res) =>{
    try {
        await Post.findById(req.params.id)
        await Comment.deleteMany({postId: req.params.id})
        res.status(200).json("post deleted")
    } catch (error) {
        res.status(500).json(err)
    }
})

// get post details
router.get("/:id", async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(err)
    }
})

// get post
router.get("/", async(req, res) =>{
    try {
        const searchFilter ={
            title: {$regex:express.query.search, $options:"i"}
        }
        const posts = await posts.find( express.query.search?
            searchFilter:null
        )
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(err)
    }
})

// get user post
router.get("/user/:userId", async (req, res) =>{
    try {
        const posts = await Post.find({userId:req.params.userId})
        res.status(200).json(err)
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router