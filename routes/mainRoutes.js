const mainController = require("../controllers/mainController");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* MIDDLEWARES */
const validationRegister = require("../middlewares/registerMW");
const validationLogin = require("../middlewares/loginMW");
const uploadFile = require("../middlewares/multerMW");


/* PÁGINA PRINCIPAL */
router.get("/", mainController.index);


/* PÁGINA DE LOGIN */
router.get("/login", mainController.login);
/* PROCESO DE LOGIN */
router.post("/login", validationLogin, mainController.loginProcess);


/* PÁGINA DE REGISTRO */
router.get("/register", mainController.register);
/* PROCESO DE REGISTRO */
router.post("/register", validationRegister, mainController.registerProcess);


module.exports = router;