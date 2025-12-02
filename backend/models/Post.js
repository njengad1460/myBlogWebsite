const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true // this ensures that each blog should have a unique title
    },
    desc:{
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    categories:{
        type: Array,
    }
},
{timestamps: true}
)

module.exports = mongoose,model("Post", postSchema)