const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json(error)
    }
})


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json("User does not exist")

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(404).json("Wrong password")

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.SECRET,
            { expiresIn: "3d" }
        )

        const { password, ...info } = user._doc

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,       // change to true in production
            sameSite: "lax"      // change to "none" in production
        }).status(200).json(info)

    } catch (error) {
        res.status(500).json(error)
    }
})


// LOGOUT
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", {
            secure: false,
            sameSite: 'lax'
        }).status(200).send("Logged out successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})

// REFETCH (GET LOGGED-IN USER)
router.get("/refetch", (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) return res.status(404).json(err)
        res.status(200).json(data)
    })
})

module.exports = router
