const express = require("express");
const app = express();
const path = require("path");
const popup = require("node-popup");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 2000;
const { response } = require("express");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "varkallaxmikant62@gmail.com",
    pass: "Lucky@382001",
  },
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "html");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "html");
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/Privacy-Policy", (req, res) => {
  res.sendFile(path.join(__dirname + "/Privacy-Policy.html"));
});

app.get("/sitemap", (req, res) => {
  res.sendFile(path.join(__dirname + "/sitemap.xml"));
});

app.post("/auth2", function (request, response) {
  var mailOptions = {
    from: request.body.email,
    to: "varkallaxmikant62@gmail.com",
    subject: request.body.name,
    text: request.body.comments,
  };
  console.log(request.body.email);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.sendFile(path.join(__dirname + "/s.html"));
    }
  });
});

app.listen(port, () => {
  console.log("express is connected at 2000");
});
