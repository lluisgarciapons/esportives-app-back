const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const { asyncMiddleware, checkToken } = require("../middleware");

authRouter.post("/login", asyncMiddleware((req, res, next) => {
    const { user, password } = req.body;
    if (user.toLowerCase() != "admin" || password.toLowerCase() != "admin") {
        return next({
            status: 401,
            message: "Credencials invalides"
        });
    }

    let token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "20h"
    });
    return res.json({ success: true, token });

}));

authRouter.get("/logout", (req, res) => {
    // req.logout();
    res.json({
        success: true,
        message: "logout success"
    });
});

authRouter.get("/", checkToken, (req, res) => {
    res.send(req.user);
});

module.exports = authRouter;