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
        if (validation.errors.length > 0){
            return res.render("login", {
                errors: validation.mapped(),
                oldData: req.body
            });
        } else {
            res.redirect("/");
        }

        // let userToLogin = users.find(function(user){
        //     user.email === req.body.email.toLowerCase();
        // })

        // if (userToLogin){
        //     if (bcrypt.compareSync(req.body.password, hashedPass)){
        //         res.redirect("/");
        //     } else {
        //         res.send("Contraseña incorrecta");
        //     }
        // }
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
        
    },

    edit: function(req, res){

    },

    delete: function(req, res){

    }
}

module.exports = controller;