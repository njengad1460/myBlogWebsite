const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs') // for hashing passwords
const jwt = require('jsonwebtoken') // stores tokens of the user after signup

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body
        const salt = await bcrypt.genSalt(10) // this salt make our cper whit this number of characters
        const hashedpassword = bcrypt.hashSync(password, salt)
        const newUser = new user({
            username, email, password:hashedpassword
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// login authentication

router.post ("/login", async (req, res) => {
    try {
        const user = await user.findOne({email:req.body.email})
        if (!user){
            return res.status(404).json("User does not existis")
        }
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){
            return res.status(404).json("Wrong password")
        }
        // generating session Id after successiffully loging in using JWT
        const token = jwt.sign({
            _di, 
            username:user.username,
            email:user.email}, process.env.SECRET,{expiresIn: "3d"})
            const {password, ...info} = user._doc
            res.cookie("token", token,{
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }).status(200).json(info)

    } catch (error) {
        res.status(500).json(error)
    }
})

// logout route
router.get("/logout", async (req,res) =>{
    try {
        res.clearCookie("token", {
            sameSite: 'none',
            secure: true
        }).status(200).send("Logged out successfully!")

    } catch (error) {
        res.status(500).json(error)
    }
})

// Refetch route

router.get("/refetch", (req,res)=>{
    const token = req.cookies.token
    jwt.verify(token,process.env.SECRET, {}, async(err, data) =>{
        if (err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router;