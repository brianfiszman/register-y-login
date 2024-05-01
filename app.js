const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const multer = require('multer');
const session = require("express-session");
const bcrypt = require("bcryptjs");

// Para usar Express
const app = express();

// ************ Middlewares ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en carpeta public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
    secret: "Mensaje secreto del Damucho",
    resave: false,
    saveUninitialized: false
}));
// const userLoggedMiddleware = require("./middlewares/userLoggedMW");
// app.use(userLoggedMiddleware);


// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));


// Requerir rutas
const mainRouter = require("./routes/mainRoutes");
app.use('/', mainRouter);


// ************ App Listen ************
app.listen(3033, function(){
    console.log(`Servidor corriendo en Puerto 3033`);
});