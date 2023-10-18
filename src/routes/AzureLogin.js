let express = require("express");
let router = express.Router();

let nodemailer = require("nodemailer");
const url = process.env.PathUrl;
const moment = require("moment");
const cron = require("node-cron");
const axios = require("axios");

router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;

  const ActiveDirectory = require("activedirectory2");

  var username = payload.username + `@kyocera.co.th`;
  var password = payload.password;


  const config = {
    url: "ldap://KTC-DC1.kyocera.co.th", // URL ของเซิร์ฟเวอร์ AD
    baseDN: "DC=kyocera,DC=co,DC=th", // ฐานข้อมูลหลักของ AD
    // baseDN: "dc=kyocera,dc=co,dc=th", // ฐานข้อมูลหลักของ AD
    username: username, // ชื่อผู้ใช้ที่มีสิทธิ์ใน AD
    password: password, // รหัสผ่านของผู้ใช้
  }; 
  const ad = new ActiveDirectory(config);
  const usernameToSearch = payload.username;
  ad.findUser(usernameToSearch, function(err, user) {
    if (err) {
      // res.json('Error: ' + JSON.stringify(err));
      return;
    }
    if (!user) {
      res.json('User not found');
    } else {
      res.json(user);
    }
  });


});

module.exports = router;


















  // // ตัวอย่างการค้นหาผู้ใช้
  //   const username = "tanawut-t";
  // // console.log(ad);

  //   ad.findUser(username, function(err, user) {
  //     if (err) {
  //       // res.json('Error: ' + JSON.stringify(err))
  //       console.log('Error: ' + JSON.stringify(err));
  //       return;
  //     }

  //     if (!user) {
  //       console.log('User not found');
  //       // res.json('User not found')

  //     } else {
  //       console.log('User found: ' + JSON.stringify(user));
  //       // res.json('User found: ' + JSON.stringify(user))

  //     }
  //   });





  // ad.authenticate(username, password, function (err, auth) {
  //   if (err) {
  //     //   console.log("ERROR: " + JSON.stringify(err));
  //     res.json("User Not found");
  //     return;
  //   }

  //   if (auth) {
  //     //   console.log("Authenticated!");
  //     ad.findUser(username, function (err, user) {
  //       res.json("User found: " + JSON.stringify(user));
  //       //   console.log('User found: ' + JSON.stringify(user));
  //     });
  //   } else {
  //     res.json("Authentication failed!");
  //     //   console.log("Authentication failed!");
  //   }
  // });