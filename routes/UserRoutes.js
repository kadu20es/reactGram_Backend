const express = require("express");
const router = express.Router()

// Controller
const {
    register,
    login,
    getCurrentUser,
    update
} = require("../controllers/UserController");

// Middleware
const validate = require("../middlewares/handleValidation")
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// Routes
// authGuard requer que o usuário esteja autenticado
router.post("/register", userCreateValidation(), validate, register); // define o endpoint
router.post("/login", loginValidation(), validate, login); // define o endpoint
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);

module.exports = router; // será utilizado em Router.js