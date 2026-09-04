const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
    if (req.cookies.token) {
        let user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } else {
        res.redirect("/login");
    }
}
module.exports = isLoggedIn;