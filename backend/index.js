const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require("path")
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/User')
const postRoute = require('./routes/Post')
const commentsRoute = require('./routes/Comments')

dotenv.config()

const app = express()

// Middleware
app.use(express.json())

app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(cookieParser())

app.use("/images", express.static(path.join(__dirname, "images")))


// Routes
app.use("/api/auth", authRoute)
app.use("/api/User", userRoute)
app.use("/api/Comments", commentsRoute)
app.use("/api/Post", postRoute)


// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
    }
})

const upload = multer({ storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image uploaded successfully")
})


// DB connect + Server start
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("DB Error:", error)
    }
}

app.listen(process.env.PORT, async () => {
    await connectDB()
    console.log("Server running on port " + process.env.PORT)
})
