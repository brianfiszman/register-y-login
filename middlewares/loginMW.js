const { check } = require("express-validator");

const validationLogin = [
    check("email").notEmpty().withMessage("Debes completar el e-mail").bail()
    .isEmail().withMessage("Debes colocar un e-mail válido").bail(),

    check("password").notEmpty().withMessage("Debes completar la contraseña").bail()
]

module.exports = validationLogin;