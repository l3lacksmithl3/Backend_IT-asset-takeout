let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let app = express();
var morgan = require("morgan");
// let connect = require("./connect");
let mongoose = require("./connect");
const fileUpload = require("express-fileupload");
require("dotenv").config();
// let test_mailer = require('./src/routes/test_mailer')
// app.use('/test_mailer', test_mailer)

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

morgan.token("date", function () {
  return new Date().toLocaleString();
});
// app.use(
//   morgan(
//     ":date :remote-addr :method :url :status :res[content-length] - :response-time ms "
//   )
// );
const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  //console.log("Listening on  port " + server.address().port);
});

// let process_audit = require("./src/routes/process_audit");
// app.use("/process_audit", process_audit);



// app.listen(port, () => {
//   console.log(`เซิร์ฟเวอร์ทำงานที่พอร์ต ${port}`);
// });




















//---------------------------------------------------------------------------------------------------------------------------------------------------//

let yield_model = require("./src/routes/yield_model");
app.use("/yield_model", yield_model);


let yield_summary = require("./src/routes/yield_summary");
app.use("/yield_summary", yield_summary);


let yield_bracket = require("./src/routes/yield_bracket");
app.use("/yield_bracket", yield_bracket);

//---------------------------------------------------------------------------------------------------------------------------------------------------//


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-with,Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

module.exports = app;
