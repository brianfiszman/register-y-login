// 1. Guardar al usuario en la BD
// 2. Buscar al usuario que se quiere loguear por su email
// 3. Buscar a un usuario por su ID
// 4. Editar la información de un usuario
// 5. Eliminar a un usuario de la BD

const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const usersDatabase = require("../data/users.json")
const jsonUsersFile = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(jsonUsersFile, 'utf-8'));
const { validationResult } = require('express-validator');

const User = {
    // jsonUsersFile: './data/users.json',
    // getData: function(){
    //     return JSON.parse(fs.readFileSync(this.jsonUsersFile, 'utf-8'));
    // },

    findAll: function(){
        // return this.getData();
        // let data = JSON.parse(fs.readFileSync(jsonUsersFile, 'utf-8'));
        return users;
    },

    findByPk: function(id){
        let userFound = users.find(function(user){
            user.id === id;
        })
        return userFound;
    },

    findByField: function(field, text){
        let userFound = users.find(function(user){
            user[field] === text;
        })
        return userFound;
    },

    create: function(req, res){
        fs.writeFileSync(jsonUsersFile, JSON.stringify(users, null, ' '));
        res.send(newUser);

        let hashedPass = bcrypt.hashSync(req.body.password, 10);
        let equalPass = bcrypt.compareSync(req.body.password, hashedPass);
        if (equalPass) {
            
        }
    },

    generateId: function(){
        let lastUser = users.pop();
        if (lastUser){
            return lastUser.id + 1;
        } else {
            return 1;
        }
    },

    update: function(){

    },

    delete: function(id){
        let finalUsers = users.filter(function(user){
            user.id !== id;
        });
        fs.writeFileSync(jsonUsersFile, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;