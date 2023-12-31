const express = require("express");
const validateToken = require("../middlewares/validateTokenHandler");

const {getAllContact, getContact, createContact, updateContact, deleteContact} = require("../controllers/contactController")

const router = express.Router();

router.use(validateToken);

router.route("/").get(getAllContact);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;