const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name:{
        type:String,
        required :[true, "Please Add the Contact Name"]
    },
    email:{
        type:String,
        required :[true, "Please Add the Email Address"]
    },
    phone:{
        type:String,
        required :[true, "Please Add the Phone Number"]
    },
},
{
    timestamps:true
}
);

const Contact = mongoose.model('contact',ContactSchema)

module.exports = Contact