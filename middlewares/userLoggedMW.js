// function userLoggedMiddleware(req, res, next){
//     req.locals.isLogged = false;
//     if(req.session && req.session.userLogged){
//         req.locals.isLogged = true;
//         req.locals.userLogged = req.session.userLogged;
//     }
//     next();
// }

// module.exports = userLoggedMiddleware;