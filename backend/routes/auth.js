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
            email:user.email})

    } catch (error) {
        res.status(500).json(error)
    }
})