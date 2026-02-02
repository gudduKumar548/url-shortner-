const express = require("express");
const {
    handlegenerateNewShortURL,
    handleGetUrlByshortId,
    handleAllurlData,
    handleDeleteUrl,
    handleGetAnalytics,
 } = require("../controller/urlcontroller");
const router = express.Router();

router.route("/")
    .post(handlegenerateNewShortURL)
    .get(handleAllurlData)

router.route("/:shortId")
    .get(handleGetUrlByshortId)
    .delete(handleDeleteUrl);

router.get("/analytics/:shortId", handleGetAnalytics);
//router.get("/analytics", handleGetAnalytics);
module.exports = router;