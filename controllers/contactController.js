const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route get /api/contacts
//@access public

const getAllContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find(); 
    res.status(200).json(contacts);
});

//@desc created contact
//@route post /api/contacts
//@access public

const createContact = (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(201).json({message:"Created Contacts"});
}

//@desc get single contact
//@route get /api/contacts/:id
//@access public

const getContact = (req, res) => {
    res.status(200).json({message:`Contact for id: ${req.params.id}`});
}

//@desc update contact
//@route put /api/contacts/:id
//@access public

const updateContact = (req, res) => {
    res.status(200).json({message:`Update Contact for ${req.params.id}`});
}

//@desc delete contacts
//@route delete /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
    res.status(200).json({message:`Delete Contact for ${req.params.id}`});
}

module.exports = {getAllContact, createContact, getContact, updateContact, deleteContact}