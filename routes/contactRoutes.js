const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({message:"Get All Contacts"});
});

router.route("/").post((req, res) => {
    res.status(200).json({message:"Created Contacts"});
});

router.route("/:id").put((req, res) => {
    res.status(200).json({message:`Update Contact for ${req.params.id}`});
});

router.route("/:id").delete((req, res) => {
    res.status(200).json({message:`Delete Contact for ${req.params.id}`});
});

module.exports = router;