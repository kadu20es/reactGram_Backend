const express = require("express");
const router = express.Router()

// Controller
const { register } = require("../controllers/UserController");

// Routes
router.post("/register", register); // define o endpoint

module.exports = router; // será utilizado em Router.js