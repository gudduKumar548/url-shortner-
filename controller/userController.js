const { v4: uuidv4 } = require("uuid");
const {setUser} = require("../service/auth");
const User = require("../model/user")

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    
    const CheckExist = await User.findOne({
        email,
    })
    if (CheckExist) {
        return res.render("signup", {
            msg:"user already exist"
        });
    }
    await User.create({
        username,
        email,
        password,
    });
    return res.redirect("/login");
}

async function handleUserLogin(req, res) {
    const {email, password } = req.body;
    
    const user = await User.findOne({
        email, password,
    })
    if (!user) {
        return res.render("login", {
            msg:"Invalid user & password"
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/");
}

module.exports = { handleUserSignup,handleUserLogin,}