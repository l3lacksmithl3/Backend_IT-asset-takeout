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

let master_section = require("./src/routes/master_section");
app.use("/master_section", master_section);

let master_it = require("./src/routes/master_it");
app.use("/master_it", master_it);

let Approve_data = require("./src/routes/Approve_data");
app.use("/Approve_data", Approve_data);

let ControllD = require("./src/routes/ControllD");
app.use("/ControllD", ControllD);

let ITasset = require("./src/routes/IT-asset");
app.use("/ITasset", ITasset);

let mailer = require("./src/routes/sendmail");
app.use("/Mailer", mailer);

let email_form = require("./src/routes/email-form");
app.use("/email_form", email_form);

let blacklist = require("./src/routes/blacklist");
app.use("/blacklist", blacklist);

let section_head = require("./src/routes/section_head");
app.use("/section_head", section_head);

let master_reserve = require("./src/routes/master_reserve");
app.use("/master_reserve", master_reserve);

let auto_approve = require("./src/routes/auto_approve");
app.use("/auto_approve", auto_approve);


let master_organization = require("./src/routes/master_organization");
app.use("/master_organization", master_organization);

let master_code = require("./src/routes/master_code");
app.use("/master_code", master_code);


let AssetOfficePC = require("./src/routes/IT-asset-OfficePC");
app.use("/AssetOfficePC", AssetOfficePC);

let AssetMouser = require("./src/routes/IT-asset-Mouses");
app.use("/AssetMouser", AssetMouser);

let AssetKeypadKeyboard = require("./src/routes/IT-asset-KeypadKeyboard");
app.use("/AssetKeypadKeyboard", AssetKeypadKeyboard);


let AzureLogin = require("./src/routes/AzureLogin");
app.use("/AzureLogin", AzureLogin);
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
