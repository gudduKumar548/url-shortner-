const { nanoid } = require("nanoid");
const URL = require("../model/url");

async function handlegenerateNewShortURL(req, res) {
    try {
        const { url } = req.body;
        if (!url) { return res.status(400).json({ msg: "url is required" }) }
        
        //checking ExistingUrl
        const ExistingUrl = await URL.findOne({ redirectURL: url });
        if (ExistingUrl) {
            return res.status(200).json({
                id: ExistingUrl.shortId,
                msg: "URL already exists",
            });
        }

        //checking for shortId collision also generating unique shortId
        let shortId;
        let isDuplicate = true;
        while (isDuplicate) {
            shortId = nanoid(8);
            const result = await URL.findOne({ shortId });
            if (!result) {
                isDuplicate = false;
            }
        }
        await URL.create({
            shortId,
            redirectURL: url,
            visitHistory: [],
        });
        return res.render('index', { id: shortId, });
       // return res.status(201).json({ id: shortId });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "internal serve error" });
    }
}
async function handleGetUrlByshortId(req, res) {
    try {
        const getUrl = await URL.findOne({ shortId: req.params.shortId });
        if (!getUrl) {
            return res.status(404).json("data not found");
        }
        return res.status(200).json(getUrl);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "internal server problem" });
    }
}
async function handleAllurlData(req, res) {
    const getAlldata = await URL.find({});
    if (!getAlldata) {
        return res.status(404).json("data not found");
    }
    return res.json(getAlldata);
}
async function handleDeleteUrl(req, res) {
    const deleteurl = await URL.findOneAndDelete(req.params.shortId);
    if (!deleteurl) {
        return res.json("data not found");
    }
    return res.json({ msg: "data deleted"});
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(400).json("not found");
    }
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}
module.exports = {
    handlegenerateNewShortURL,
    handleGetUrlByshortId,
    handleAllurlData,
    handleDeleteUrl,
    handleGetAnalytics,
}