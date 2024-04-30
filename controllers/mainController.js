const { validationResult } = require("express-validator");
let fs = require("fs");
const path = require("path");
const session = require("express-session");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const jsonUsersFile = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(jsonUsersFile, 'utf-8'));

const controller = {
    index: function(req, res){
        res.render("index");
    },

    login: function(req, res){
        res.render("login");
    },

    loginProcess: function(req, res){
        // VALIDACIÓN
        const validation = validationResult(req);    

        let userToLogin = users.find(user => user.email == req.body.email.toLowerCase().trim());
        if (userToLogin){
            let equalPass = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (equalPass){
                res.redirect("/");
            } else {
                res.render("login", {
                    errors: {
                        password: {
                            msg: "La contraseña ingresada es incorrecta"
                        },
                        oldData: req.body
                    }
                })
            }
        } else {
            res.render("login", {
                errors: {
                    email: {
                        msg: "Usuario no encontrado"
                    },
                    oldData: req.body
                }
            })
        }

        return res.render("login", {
            errors: validation.mapped(),
            oldData: req.body
        })

        // return res.render("login", {
        //     errors: {
        //         email: {
        //             msg: "El e-mail ingresado es incorrecto",
        //             oldData: req.body
        //         },

        //         password: {
        //             msg: "La contraseña ingresada es incorrecta"
        //         }
        //     }
        // })
    },

    register: function(req, res){
        res.render("register");
    },

    registerProcess: function(req, res){

        // VALIDACIÓN
        const validation = validationResult(req);
        if (validation.errors.length > 0){
            return res.render("register", {
                errors: validation.mapped(),
                oldData: req.body
            });
        } else {
            res.redirect("/");
        }

        // HASHEO DE CONTRASEÑA Y VERIFICACIÓN SI SON IGUALES
        let hashedPass = bcrypt.hashSync(req.body.password, 10);
        let equalPass = bcrypt.compareSync(req.body.password, hashedPass);

        // GENERAR ID
        let maxId = 0;
        for (const obj of users) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }

        // INFORMACIÓN A GUARDAR EN EL JSON
        if (equalPass){
            let newUser = {
                id: maxId + 1,
                username: req.body.username,
                email: req.body.email,
                // password: req.body.password
                password: hashedPass
            }
            users.push(newUser);
            fs.writeFileSync(jsonUsersFile, JSON.stringify(users, null, ' '));
        }

        /* 
            A FUTURO SE PUEDE AGREGAR FUNCIÓN QUE NO PERMITA REPETIRSE EL MAIL DE REGISTRO.
            VER PROCESO DE LOGIN COMPLETO (EXPRESS CLASE 32).
        */
        
    },

    edit: function(req, res){

    },

    delete: function(req, res){
        
    }

}

module.exports = controller;