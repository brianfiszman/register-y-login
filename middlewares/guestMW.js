function guestMiddleware(req, res, next){
    if (req.session.userLogged){
        res.redirect("/profile");
    } else {
        next();
    }
}

module.exports = guestMiddleware;