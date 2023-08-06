const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required :[true, "Please Add the Username"]
    },
    email:{
        type:String,
        required :[true, "Please Add the Email Address"]
    },
    password:{
        type:String,
        required :[true, "Please Add the Password"]
    },
},
{
    timestamps:true
}
);

const User = mongoose.model('user',UserSchema)

module.exports = User