const express = require("express");
const { connectMongoDb } = require("./connection/connection");
const URL = require("./model/url");
const path = require("path");

// routes
const urlRoute = require("./routes/router");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/userRoute");

//request handler & port
const app = express();
const port = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/URL-shortner")
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log("mongo err", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);
app.use(express.static(path.join(__dirname, "public")));

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    // const entry = await URL.findOne({shortId,})
    const entry = await URL.findOneAndUpdate(
      { shortId }, // findout with shortId that entry exists or not
      { $push: { visitHistory: { timestamp: Date.now() } } }, //update website visit count in visitHistory array
      { new: true },
    );

    if (!entry) {
      return res.status(404).json({ msg: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("server started");
});
