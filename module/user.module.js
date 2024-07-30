const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique:true
    },
    useremail:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    
    },
})

const User= mongoose.model('AllUserData', userSchema)

module.exports= User;