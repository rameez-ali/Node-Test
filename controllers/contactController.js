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

const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });

    res.status(201).json(contact);
});

//@desc get single contact
//@route get /api/contacts/:id
//@access public

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No Contacts Found");
    }
    res.status(200).json(contact);
});

//@desc update contact
//@route put /api/contacts/:id
//@access public

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No Contacts Found");
    }

    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedcontact);
});

//@desc delete contacts
//@route delete /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No Contacts Found");
    }

    await contact.deleteOne()
    res.status(200).json(contact);
});

module.exports = {getAllContact, createContact, getContact, updateContact, deleteContact}