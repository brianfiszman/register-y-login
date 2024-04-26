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
        let allUsers = this.findAll();
        let userFound = allUsers.find(function(user){
            user.id === id;
        })
        return userFound;
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(function(user){
            user[field] === text;
        })
        return userFound;
    },

    create: function(req, res){
        // let allUsers = this.findAll();
        let allUsers = users;
        // let newUser = req.body;
        fs.writeFileSync(jsonUsersFile, JSON.stringify(allUsers, null, ' '));
        res.send(newUser);

        let hashedPass = bcryptjs.hashSync(req.body.password, 10);
        let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPass);
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

    delete: function(){

    },
}

// User.create({username: "Damucho", email: "damucho@damucho.com"});
module.exports = User;