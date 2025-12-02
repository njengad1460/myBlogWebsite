const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require ('./User')
const post = require('../routes/Post')
const Comment = require('../routes/Comments')
const verifyToken = require('../verifyToken')

// update
router.put ("/:id", verifyToken, async (req, res) =>{
    try {
        if (req.body.password){
            const salt = bcrypt.getSalt(10)
            req.body.password = bcrypt.hashSync(req.body.password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete user

router.delete ("/:id", verifyToken, async (req, res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        await post.deleteMany({userId: req.params.id})
        await Comment.deleteMany({userId: req.params.id})
        res.status(200).json("user deleted successfully")
        
    } catch (error) {
        res.status(500).json
    }

})

// Get User
router.get("/:id", async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...info} =user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router