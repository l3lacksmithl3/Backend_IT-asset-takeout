let express = require("express");
let router = express.Router();

let nodemailer = require("nodemailer");
const Email = require("../schema/email-form");
const Approve_data = require("../schema/Approve_data");
const user_reserve = require("../schema/master_reserve");
const asset = require("../schema/IT-asset");
const url = process.env.PathUrl;
const moment = require("moment");
const cron = require("node-cron");

const axios = require("axios");

// foo();
// function foo() {
//   cron.schedule("*/10 * * * * *", async function () {
//     // console.clear()
//     // console.log(moment().format("H:mm:ss"));
//     const d = await Approve_data.aggregate([
//       {
//         $match: {
//           date_end: {
//             $lte: new Date(),
//           },
//           "takeout.Approve_Step": 1,
//         },
//       },
//     ]).sort({ end_date: 1 });
//     console.log("🚀 ~ file: auto_approve.js:22 ~ d:", d.length);

//     if (d.length > 0) {
//       const job = d[0];
//       console.log("🚀 ~ file: auto_approve.js:33 ~ item:", job);
//       const ap1 = job.takeout.approve_1.value.find((a) => a.level == 3);
//       console.log("🚀 ~ file: auto_approve.js:35 ~ ap1:", ap1);
//       let ap2_temp = await user_reserve.aggregate([
//         {
//           $match: {
//             department: ap1.department,
//           },
//         },
//       ]);
//       // console.log("🚀 ~ file: auto_approve.js:41 ~ ap2:", ap2)

//       let res = await axios.post(
//         "http://10.200.90.152:4012/user_masterGetByemployee",
//         {
//           employee: ap2_temp[0].division_employee,
//         }
//       );

//       let ap2 = res.data[0];
//       console.log("🚀 ~ file: auto_approve.js:50 ~ ap2:", ap2);
//       count_item(ap1, ap2, job);
//       ToLevel3Division(ap1, ap2, job);

//       await Approve_data.updateOne(
//         { ControlID: job.ControlID },
//         { $set: { date_end: null } }
//       );

//       // console.log("🚀 ~ file: auto_approve.js:45 ~ res:", res)

//       // console.log("🚀 ~ file: auto_approve.js:39 ~ ap2:", ap2)
//       // count_item(item);
//       // ToLevel3Division(item);
//     }
//   });
// }

// function count_item(ap1, ap2, job) {
//   let asssset = job.takeout.item;
//   Email.find({ name: "Mail_Requester" }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       reject(rs[0]);
//     }
//   });

//   async function reject(e) {
//     let tableContent = `
//   <table style="border-collapse: collapse; width: 100%;">
//     <tr>
//       <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
//       <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
//       <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
//       <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
//     </tr>
//   `;
//     for (const [index, item] of asssset.entries()) {
//       tableContent += `
//    <tr>
//      <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
//        index + 1
//      }</td>
//      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//        item.value
//      }</td>
//      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//        item.name
//      }</td>
//      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//        item.period
//      }</td>
//    </tr>
//     `;
//     }
//     tableContent += "</table>";
//     e.value.content = e.value.content.replace(
//       "Status : ",
//       `Please confirm.</br><span style="color:#1d76db;">${ap1.name}</span> allowed <span style="color:#1d76db;">${ap2.name}</span> to approve instead.`
//     );
//     e.value.content = e.value.content.replace("!Status", ` `);
//     e.value.content = e.value.content.replace(
//       /!Applicant/g,
//       `${job.takeout.name}`
//     );
//     e.value.content = e.value.content.replace(
//       /!ControlID/g,
//       `${job.ControlID}</br>${tableContent}`
//     );
//     e.value.content = e.value.content.replace(
//       /!Link/g,
//       `<a href='${url}ApproveFormConfirm?reserve=${job._id}'>IT asset takeout</a>`
//     );

//     // res.json(e)
//     let transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "notifications@kyocera.co.th",
//         pass: "NRP@&Sep22",
//       },
//     });
//     try {
//       console.log(
//         `Approve reserve mail: ${moment().format()} => email : ${ap2.email}`
//       );

//       let info;
//       info = await transporter.sendMail({
//         from: "notifications@kyocera.co.th", // sender address
//         to: "thaksin-b@kyocera.co.th", // list of receivers
//         cc: [],
//         subject: e.value.subject, // Subject line
//         html: e.value.content,
//       });
//     } catch (error) {
//       console.log("@error", error);
//     }
//   }
// }

// function ToLevel3Division(ap1, ap2, job) {
//   let asssset = job.takeout.item;
//   Email.find({ name: "Mail_Requester" }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       reject(rs[0]);
//     }
//   });

//   async function reject(e) {
//     let tableContent = `
//   <table style="border-collapse: collapse; width: 100%;">
//     <tr>
//       <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
//       <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
//       <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
//       <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
//     </tr>
//   `;
//     for (const [index, item] of asssset.entries()) {
//       tableContent += `
//    <tr>
//      <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
//        index + 1
//      }</td>
//      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//        item.value
//      }</td>
//      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//        item.name
//      }</td>
//      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//        item.period
//      }</td>
//    </tr>
//     `;
//     }
//     tableContent += "</table>";
//     e.value.content = e.value.content.replace(
//       "Status : ",
//       `Allow <span style="color:#1d76db;">${ap2.name}</span> to approve`
//     );
//     e.value.content = e.value.content.replace("!Status", ` `);

//     e.value.content = e.value.content.replace(
//       /!Applicant/g,
//       `${job.takeout.name}`
//     );
//     e.value.content = e.value.content.replace(
//       /!ControlID/g,
//       `${job.ControlID}</br>${tableContent}`
//     );
//     e.value.content = e.value.content.replace(
//       /!Link/g,
//       `<a href='${url}ApproveFormConfirm?id=${job._id}'>IT asset takeout</a>`
//     );

//     // res.json(e)
//     let transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "notifications@kyocera.co.th",
//         pass: "NRP@&Sep22",
//       },
//     });
//     try {
//       console.log(
//         `Approve requester mail: ${moment().format()} => email : ${
//           job.takeout.email
//         }`
//       );

//       let info;
//       info = await transporter.sendMail({
//         from: "notifications@kyocera.co.th", // sender address
//         to: "thaksin-b@kyocera.co.th", // list of receivers
//         cc: [],
//         subject: e.value.subject, // Subject line
//         html: e.value.content,
//       });
//     } catch (error) {
//       console.log("@error", error);
//     }
//   }
// }
// // doo();
// function doo() {
//   cron.schedule("0 50 17 * * *", async function () {
//     console.log("aaaaa");
//     const d = await Approve_data.aggregate([
//       {
//         $match: {
//           "takeout.Approve_Step": 1,
//         },
//       },
//     ]);
//     console.log("🚀 ~ file: auto_approve.js:257 ~ d:", d.length);
//     const form = d.map((a) => {
//       return {
//         updateOne: {
//           filter: { ControlID: a.ControlID },
//           update: {
//             $set: {
//               "takeout.Approve_Step": 2,
//               "takeout.Approve_by": "approve automation",
//               "takeout.Approve_time":moment().format(),
//             },
//           },
//         },
//       };
//     });
//     console.log("🚀 ~ file: auto_approve.js:272 ~ form ~ form:", form)
//    let update = await Approve_data.bulkWrite(form);
//    console.log("🚀 ~ file: auto_approve.js:273 ~ update:", update)
//   });
// }

module.exports = router;
