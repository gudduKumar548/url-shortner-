const express = require("express");
const URL = require("../model/url");
const router = express.Router();

router.get("/", async (req, res) => {
    const Allurls = await URL.find({});

    if (!Allurls) {
        return res.status(500).json("not found");
    }
    return res.render("index", {
        urls: Allurls,
    });
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async(req, res) => {
    return res.render("login");
})

module.exports = router;