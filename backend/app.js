const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://13.50.235.148"] }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
//Import all routes
const auth = require("./routes/authRouter");
const dataCovid = require("./routes/covidRoutes");



const path = require("path");

//Setting Up Config File
if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use("/api/v1", auth);
app.use("/api/v1", dataCovid);



app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
__dirname = path.resolve();
// if (process.env.NODE_ENV == "Production") {
app.use(express.static(path.join(__dirname, "frontend/build")));

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
// }
module.exports = app;
