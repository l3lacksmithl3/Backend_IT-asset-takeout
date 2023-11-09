let express = require("express");
let router = express.Router();

let nodemailer = require("nodemailer");

//database
const Email = require("../schema/email-form");
const Approve_data = require("../schema/Approve_data");
const asset = require("../schema/IT-asset");
const master_organization = require("../schema/master_organization");
const master_code = require("../schema/master_code");

const axios = require("axios");
const url = process.env.PathUrl;
const moment = require("moment");
const cron = require("node-cron");
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------
// let nodemailer = require("nodemailer");

// ? ------------------------------------------------------ Master
// * add

//TODO takeout success ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Takeout_success", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Requester" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  async function reject(e) {
    let tableContent = `<p>IT asset takeout list</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
        </tr> 
      `;
    for (const [index, item] of req.body.asset.entries()) {
      tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
           index + 1
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.value
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.name
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.period
         }</td>
       </tr>
        `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}`
    );
    e.value.content = e.value.content.replace(/!Status/g, `Complete`);
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID}</br>${tableContent}`
    );

    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApplicationProgress?view_takeout=${req.body._id}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      // console.log(req.body);
      // console.log(new_user);
      // console.log(e.value.content);
      console.log(
        `Applied success : ${moment().format()} => email : ${
          req.body.requester_mail
        }`
      );
      // console.log(req.body);

      let info;
      info = await transporter.sendMail({
        from: "notifications@kyocera.co.th", // sender address
        // to: req.body.email, // list of receivers
        // to: "thaksin-b@kyocera.co.th", // list of receivers
        to: 'thaksin-b@kyocera.co.th', // list of receivers
        // to: user.email, // list of receivers
        cc: [],
        subject: e.value.subject, // Subject line
        html: e.value.content,
      });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO return success ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Return_success", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Requester" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  async function reject(e) {
    let tableContent = `<p>IT asset return list</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
        </tr> 
      `;
    for (const [index, item] of req.body.asset.entries()) {
      tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
           index + 1
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.value
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.name
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.period
         }</td>
       </tr>
        `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}`
    );
    e.value.content = e.value.content.replace(/!Status/g, `Complete`);
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID}</br>${tableContent}`
    );

    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApproveReturn?approve-return=${req.body._id}&return=${req.body.return_count}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      // console.log(req.body);
      // console.log(new_user);
      // console.log(e.value.content);
      console.log(
        `Applied success : ${moment().format()} => email : ${
          req.body.requester_mail
        }`
      );
      // console.log(req.body);

      let info;
      info = await transporter.sendMail({
        from: "notifications@kyocera.co.th", // sender address
        // to: req.body.email, // list of receivers
        // to: "thaksin-b@kyocera.co.th", // list of receivers
        to: 'thaksin-b@kyocera.co.th', // list of receivers
        // to: user.email, // list of receivers
        cc: [],
        subject: e.value.subject, // Subject line
        html: e.value.content,
      });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO Extend success ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Extend_success", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Requester" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  async function reject(e) {
    let tableContent = `<p>IT asset extend list</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Extend</th>
        </tr> 
      `;
    for (const [index, item] of req.body.asset.entries()) {
      tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
           index + 1
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.value
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.name
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.period
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.title
         }</td>
       </tr>
        `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}`
    );
    e.value.content = e.value.content.replace(/!Status/g, `Complete`);
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID}</br>${tableContent}`
    );

    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApproveExtend?approve-extend=${req.body._id}&extend=${req.body.extend_count}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      // console.log(req.body);
      // console.log(new_user);
      // console.log(e.value.content);
      console.log(
        `Extend success : ${moment().format()} => email : ${
          req.body.requester_mail
        }`
      );
      // console.log(req.body);

      let info;
      info = await transporter.sendMail({
        from: "notifications@kyocera.co.th", // sender address
        // to: req.body.email, // list of receivers
        // to: "thaksin-b@kyocera.co.th", // list of receivers
        to: 'thaksin-b@kyocera.co.th', // list of receivers
        // to: user.email, // list of receivers
        cc: [],
        subject: e.value.subject, // Subject line
        html: e.value.content,
      });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO extend ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Approve_Extend", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Approve" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  // console.log(req.body);
  async function reject(e) {
    let tableContent = `<p>List asset extend</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Extend</th>
        </tr> 
      `;
    for (const [index, item] of req.body?.asset?.entries()) {
      tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
           index + 1
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.value
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.name
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.period
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.title
         }
         </td>

         
       </tr>
        `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID}`
    );
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}</br></br>${tableContent}`
    );
    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApproveExtend?approve-extend=${req.body._id}&extend=${req.body.extend_count}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      console.log(
        `Approve extend : ${moment().format()} => email : ${req.body.approver}`
      );
      // console.log(req.body?.asset);
      // console.log(req.body);
      for (const email of req.body.approver) {
        let info;
        info = await transporter.sendMail({
          from: "notifications@kyocera.co.th", // sender address
          // to: req.body.email, // list of receivers
          // to: "thaksin-b@kyocera.co.th", // list of receivers
          to: 'thaksin-b@kyocera.co.th', // list of receivers
          // to: user.email, // list of receivers
          cc: [],
          subject: e.value.subject, // Subject line
          html: e.value.content,
        });
      }
      // let info;
      // info = await transporter.sendMail({
      //   from: "notifications@kyocera.co.th", // sender address
      //   // to: req.body.email, // list of receivers
      //   // to: "thaksin-b@kyocera.co.th", // list of receivers
      //   to: req.body.approver[0], // list of receivers
      //   // to: user.email, // list of receivers
      //   cc: req.body.approver,
      //   subject: e.value.subject, // Subject line
      //   html: e.value.content,
      // });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO takeout ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Approve_request", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Approve" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  // console.log(req.body);
  async function reject(e) {
    let tableContent = `<p>List asset-takeout</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
        </tr> 
      `;
    for (const [index, item] of req.body?.asset?.entries()) {
      tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
           index + 1
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.value
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.name
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.period
         }</td>
       </tr>
        `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID}`
    );
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}</br></br>${tableContent}`
    );
    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApproveFormConfirm?approve=${req.body._id}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      console.log(
        `Approve Takeout : ${moment().format()} => email : ${req.body.approver}`
      );
      // console.log(req.body);

      
      for (const email of req.body.approver) {
        let info;
        info = await transporter.sendMail({
          from: "notifications@kyocera.co.th", // sender address
          // to: req.body.email, // list of receivers
          // to: "thaksin-b@kyocera.co.th", // list of receivers
          to: 'thaksin-b@kyocera.co.th', // list of receivers
          // to: user.email, // list of receivers
          cc: [],
          subject: e.value.subject, // Subject line
          html: e.value.content,
        });
  
      }
      // info = await transporter.sendMail({
      //   from: "notifications@kyocera.co.th", // sender address
      //   // to: req.body.email, // list of receivers
      //   // to: "thaksin-b@kyocera.co.th", // list of receivers
      //   to: req.body.approver[0], // list of receivers
      //   // to: user.email, // list of receivers
      //   cc: req.body.approver,
      //   subject: e.value.subject, // Subject line
      //   html: e.value.content,
      // });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO return ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Approve_return", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Approve" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  // console.log(req.body);
  async function reject(e) {
    let tableContent = `<p>List asset-return</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
        </tr> 
      `;
    for (const [index, item] of req.body?.asset?.entries()) {
      tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
           index + 1
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.value
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.name
         }</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
           item.period
         }</td>
       </tr>
        `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID}`
    );
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}</br></br>${tableContent}`
    );
    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApproveReturn?approve-return=${req.body._id}&return=${req.body.return_count}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      console.log(
        `Approve request : ${moment().format()} => email : ${req.body.approver}`
      );
      // console.log(req.body);

      for (const email of req.body.approver) {
        let info;
          info = await transporter.sendMail({
          from: "notifications@kyocera.co.th", // sender address
          // to: req.body.email, // list of receivers
          // to: "thaksin-b@kyocera.co.th", // list of receivers
          to: 'thaksin-b@kyocera.co.th', // list of receivers
          // to: user.email, // list of receivers
          cc: [],
          subject: e.value.subject, // Subject line
          html: e.value.content,
        });
      }
      // let info;
      // info = await transporter.sendMail({
      //   from: "notifications@kyocera.co.th", // sender address
      //   // to: req.body.email, // list of receivers
      //   // to: "thaksin-b@kyocera.co.th", // list of receivers
      //   to: req.body.approver[0], // list of receivers
      //   // to: user.email, // list of receivers
      //   cc: req.body.approver,
      //   subject: e.value.subject, // Subject line
      //   html: e.value.content,
      // });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO reject takeout ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/RejectM", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Requester" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  async function reject(e) {
    let tableContent = `
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
      </tr> 
    `;
    for (const [index, item] of req.body?.asset?.entries()) {
      tableContent += `
     <tr>
       <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
         index + 1
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.value
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.name
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.period
       }</td>
     </tr>
      `;
    }
    tableContent += "</table>";



    e.value.content = e.value.content.replace(
      "A new application has arrived<br>Please confirm.",
    `Your application has rejected!<br>Reason : ${req.body?.reason?.comment}`
    );
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}`
    );
    e.value.content = e.value.content.replace(/!Status/g, `Reject`);
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID} </br></br> ${tableContent}`
    );
    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApplicationProgress?reject=${req.body._id}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      console.log(
        `Reject success : ${moment().format()} => email : ${
          req.body.requester_mail
        }`
      );
      // console.log(req.body);
      // console.log(new_user);
      // console.log(e.value.content);

      let info;
      info = await transporter.sendMail({
        from: "notifications@kyocera.co.th", // sender address
        // to: req.body.email, // list of receivers
        // to: "thaksin-b@kyocera.co.th", // list of receivers
        to: 'thaksin-b@kyocera.co.th', // list of receivers

        cc: [],
        subject: e.value.subject, // Subject line
        html: e.value.content,
      });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO reject extend ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Mail_Reject_Extend", async function (req, res, next) {
  res.json("ok");
  Email.find({ name: "Mail_Requester" }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      reject(rs[0]);
    }
  });

  async function reject(e) {
    let tableContent = `
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Extend</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Reason</th>
      </tr> 
    `;
    for (const [index, item] of req.body?.asset?.entries()) {
      tableContent += `
     <tr>
       <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
         index + 1
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.value
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.name
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.period
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.title
       }</td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
        item.reason
      }</td>
     </tr>
      `;
    }
    tableContent += "</table>";
    e.value.content = e.value.content.replace(
      /!Applicant/g,
      `${req.body.requester}`
    );
    e.value.content = e.value.content.replace(/!Status/g, `Reject`);
    e.value.content = e.value.content.replace(
      /!ControlID/g,
      `${req.body.ControlID} </br></br> ${tableContent}`
    );
    e.value.content = e.value.content.replace(
      /!Link/g,
      `<a href='${url}ApproveExtend?approve-extend=${req.body._id}&extend=${req.body.extend_count}'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      console.log(
        `Reject Extend success : ${moment().format()} => email : ${
          req.body.requester_mail
        }`
      );
      // console.log(req.body);
      // console.log(new_user);
      // console.log(e.value.content);

      let info;
      info = await transporter.sendMail({
        from: "notifications@kyocera.co.th", // sender address
        // to: req.body.email, // list of receivers
        // to: "thaksin-b@kyocera.co.th", // list of receivers
        to: 'thaksin-b@kyocera.co.th', // list of receivers

        cc: [],
        subject: e.value.subject, // Subject line
        html: e.value.content,
      });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

//TODO force return  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/Return_Force", async function (req, res, next) {
  res.json("ok");
  let req_filter = {
    "return.Approve_Step": 1,
    "return.item.value": {
      $in: [req.body.asset?.toLowerCase(), req.body.asset?.toUpperCase()],
    },
  };

  Approve_data.find(req_filter, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      if (rs.length != 0) {
        reject(rs[0]);
      }
    }
  });

  // console.log(req.body);
  async function reject(e) {
    let tableContent = `A new application has arrived</br>
      Please return.</br></br>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">Request No</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Reason</th>
        </tr>
      `;

    tableContent += `
       <tr>
         <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${e.ControlID}</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${req.body.asset}</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${req.body.asset_type}</td>
         <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${req.body.reason}</td>
       </tr>
        `;

    tableContent +=
      "</table> </br>IT Asset Takeout</br>Please access Web as link for see detail: !Link";

    tableContent = tableContent.replace(
      /!Link/g,
      `<a href='${url}/ItAssetReturn'>IT asset takeout</a>`
    );

    // res.json(e)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "notifications@kyocera.co.th",
        pass: "NRP@&Sep22",
      },
      // auth: mail[0].auth,
    });
    try {
      console.log(
        `Return force success : ${moment().format()} => email : ${
          e.takeout.email
        }`
      );
      // console.log(req.body);

      let info;
      info = await transporter.sendMail({
        from: "notifications@kyocera.co.th", // sender address
        // to: "thaksin-b@kyocera.co.th", // list of receivers
        to: 'thaksin-b@kyocera.co.th', // list of receivers
        cc: [],
        subject: `[IT asset takeout]`, // Subject line
        html: tableContent,
      });

      // res.json(info);
      // res.json("Email sent successfully OK");
    } catch (error) {
      console.log("@error", error);
    }
  }
});

cron.schedule("0 00 16 * * *", function () {
  intervalFunc();
});





// intervalFunc();
async function intervalFunc() {
  let data = [];
  let res = await Approve_data.aggregate([
    {
      $match: {
        $or: [{ "takeout.Approve_Step": 1 }, { "return.Approve_Step": 1 }],
      },
    },
  ]);

  let list = [];
  for (const item of res) {
    if (item.return) {
      //return
      if (item.return) {
        for (let index = item.return.count_return; index >= 1; index--) {
          if (
            item.return[`return_${index}`] &&
            !item.return[`return_${index}`]?.some(
              (e) => e.Approve_employee != undefined
            )
          ) {
            list.push({
              id: item._id,
              ControlID: item.ControlID,
              "Business Model": "IT asset return",
              Value: item.return,
              type: index,
              item: item.return[`return_${index}`]?.length,
            });
          }
        }
      }

      //extend
      if (item.extend) {
        for (let index = item.extend.count_extend; index >= 1; index--) {
          if (
            item.extend[`extend_${index}`] &&
            !item.extend[`extend_${index}`]?.some(
              (e) => e.Approve_employee != undefined
            )
          ) {
            list.push({
              id: item._id,
              ControlID: item.ControlID,
              "Business Model": "IT asset extend",
              Value: item.extend,
              type: index,
              item: item.extend[`return_${index}`]?.length,
            });
          }
        }
      }
    }

    if (item.takeout) {
      if (item.takeout.Approve_Step == 1) {
        list.push({
          id: item._id,
          ControlID: item.ControlID,
          "Business Model": "IT asset takeout application form",
          Value: item.takeout,
        });
      }
    }
  }

  let data_list = await Promise.all(
    list.map(async (e) => {
      let asset = [];
      if (e.type && e["Business Model"] == "IT asset return") {
        asset = e.Value[`return_${e.type}`];
      }
      if (e.type && e["Business Model"] == "IT asset extend") {
        asset = e.Value[`extend_${e.type}`];
      }
      if (e["Business Model"] == "IT asset takeout application form") {
        asset = e.Value[`item`];
      }
      let approve = await organization(e.Value.section, e.Value.level);

      return {
        ...e,
        asset: asset,
        approve: approve,
        requester_name: e.Value.name,
        requester_email: e.Value.email,
      };
    })
  );
  const form_mail = await Email.find({ name: "Mail_Requester" });
  let mail = form_mail[0].value;

  for (const job of data_list) {
    await delay(1000);
    // console.log(job.requester_email);
    // console.log(job);
    mail_check(mail, job.requester_email, job);
  }

  //approve list
  //TODO

  // mail_check(mail, data_list[1].requester_email, data_list[1]);
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
//TODO automail 4.00
async function mail_check(mail, requester_email, data) {
  let header = "";
  if (data["Business Model"] == "IT asset return") {
    header = "List asset-return";
  }
  if (data["Business Model"] == "IT asset extend") {
    header = "List asset-extend";
  }
  if (data["Business Model"] == "IT asset takeout application form") {
    header = "IT asset takeout";
  }

  let tableContent = `<p>${header}</p>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
      </tr> 
    `;
  for (const [index, item] of data.asset.entries()) {
    tableContent += `
     <tr>
       <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
         index + 1
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.value
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.name
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
         item.period
       }</td>
     </tr>
      `;
  }
  tableContent += "</table>";

  let list_approve = `<a style="color:black">List of approver no responding</a>
    <table style="border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Approver</th>
      </tr> 
    `;
  for (const [index, item] of data.approve.entries()) {
    list_approve += `
     <tr>
       <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
         index + 1
       }</td>
       <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item}</td>
     </tr>
      `;
  }
  list_approve += "</table>";

  {
    /* <p>A new application has arrived<br><span style="color:rgb(36, 36, 36);"><span style="background-color:rgb(255, 255, 255);"><br>Status : </span></span><span style="color:#0052cc;"><span style="background-color:rgb(255, 255, 255);">!Status<br></span></span><span style="color:rgb(36, 36, 36);"><span style="background-color:rgb(255, 255, 255);">Applicant : </span></span><span style="color:#1d76db;">!Applicant</span><span style="color:#0052cc;"><span style="background-color:rgb(255, 255, 255);"><br></span></span>ControlID : <span style="color:#0052cc;">!ControlID<br></span></p><p><span style="color:rgb(36, 36, 36);"><span style="background-color:rgb(255, 255, 255);">IT Asset Takeout<br>Please access Web as link for see detail: </span></span><span style="color:#0052cc;"><span style="background-color:rgb(255, 255, 255);">!Link</span></span></p> */
  }

  let content = mail.content;
  content = content.replace(/!Applicant/g, `${data.requester_name}`);
  content = content.replace(
    "A new application has arrived",
    `Please ask to approver in another way to make approval proceed.`
  );
  content = content.replace(/!Status/g, `Not responding`);
  content = content.replace(/!ControlID/g, `${data.ControlID}`);

  content = content.replace(
    `${data.ControlID}</span></p>`,
    `${data.ControlID}<br></span></br></br>${list_approve}</br>${tableContent}`
  );

  //</br></br>${list_approve}</br>${tableContent}
  // !ControlID<br></span>

  if (data["Business Model"] == "IT asset return") {
    content = content.replace(
      /!Link/g,
      `<a href='${url}ApproveReturn?approve-return=${data.id}&return=${data.type}'>IT asset takeout</a>`
    );
  }

  if (data["Business Model"] == "IT asset extend") {
    content = content.replace(
      /!Link/g,
      `<a href='${url}ApproveExtend?approve-extend=${data.id}&extend=${data.type}'>IT asset takeout</a>`
    );
  }

  if (data["Business Model"] == "IT asset takeout application form") {
    content = content.replace(
      /!Link/g,
      `<a href='${url}ApplicationProgress?view_takeout=${data.id}'>IT asset takeout</a>`
    );
  }

  // res.json(e)
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "notifications@kyocera.co.th",
      pass: "NRP@&Sep22",
    },
  });
  try {
    console.log(
      `Auto check not approve in time : ${moment().format()} => email : ${requester_email}`
    );
    // console.log(data);

    let info;
    info = await transporter.sendMail({
      from: "notifications@kyocera.co.th", // sender address
      to: 'thaksin-b@kyocera.co.th', // list of receivers
      cc: [],
      subject: mail.subject, // Subject line
      html: content,
    });
  } catch (error) {
    console.log("@error", error);
  }
}

async function employee(code) {
  let koo = await axios.post(
    "http://10.200.90.152:4012/user_masterGetByemployee",
    {
      employee: code,
    }
  );
  return koo.data[0].full_name;
}

async function organization(section, level) {
  let data_organization = await master_organization.aggregate([
    {
      $match: { organization: section },
    },
  ]);
  let approver = [];

  if (Number(level) == 1) {
    for (let index = 1; index <= 2; index++) {
      // 1
      let Organ = await master_code.aggregate([
        {
          $match: {
            code: {
              $in: [
                data_organization[0].code[index],
                Number(data_organization[0].code[index]),
              ],
            },
          },
        },
      ]);
      approver.push(...Organ[0].code_employee);
    }
  }

  if (Number(level) == 2) {
    let Organ = await master_code.aggregate([
      {
        $match: {
          code: {
            $in: [
              data_organization[0].code[1],
              Number(data_organization[0].code[1]),
            ],
          },
        },
      },
    ]);
    approver.push(...Organ[0].code_employee);
  }

  if (Number(level) == 3) {
    let Organ = await master_code.aggregate([
      {
        $match: {
          code: {
            $in: [
              data_organization[0].code[0],
              Number(data_organization[0].code[0]),
            ],
          },
        },
      },
    ]);
    approver.push(...Organ[0].code_employee);
  }

  let conv = await Promise.all(
    approver.map(async (d) => {
      let emp = await employee(d);
      return emp;
    })
  );
  // console.log(conv);

  return conv;
}

// //extend
// router.post("/Extend", async function (req, res, next) {
//   res.json("ok");
//   Email.find({ name: "Mail_Requester" }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       reject(rs[0]);
//     }
//   });

//   async function reject(e) {
//     let tableContent = `<p>The list has been expanded.</p>
//       <table style="border-collapse: collapse; width: 100%;">
//         <tr>
//           <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
//           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
//           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
//           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
//         </tr>
//       `;
//     for (const [index, item] of req.body.extend.entries()) {
//       tableContent += `
//        <tr>
//          <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
//            index + 1
//          }</td>
//          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//            item.value
//          }</td>
//          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//            item.name
//          }</td>
//          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//            item.period
//          }</td>
//        </tr>
//         `;
//     }
//     tableContent += "</table>";

//     e.value.content = e.value.content.replace(/!Status/g, `Complete`);
//     e.value.content = e.value.content.replace(
//       /!ControlID/g,
//       `${req.body.ControlID}</br></br>${tableContent}`
//     );
//     e.value.content = e.value.content.replace(
//       /!Applicant/g,
//       `${req.body.requester}`
//     );

//     e.value.content = e.value.content.replace(
//       /!Link/g,
//       `<a href='${url}ApplicationProgress?id_1=${req.body._id}'>IT asset takeout</a>`
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
//       // auth: mail[0].auth,
//     });
//     try {
//       // console.log(req.body);
//       // console.log(new_user);
//       // console.log(e.value.content);
//       console.log(`Extend : ${moment().format()} => email : ${req.body.email}`);
//       // console.log(req.body);

//       let info;
//       info = await transporter.sendMail({
//         from: "notifications@kyocera.co.th", // sender address
//         // to: req.body.email, // list of receivers
//         to: "thaksin-b@kyocera.co.th", // list of receivers
//         // to: user.email, // list of receivers
//         cc: [],
//         subject: e.value.subject, // Subject line
//         html: e.value.content,
//       });

//       // res.json(info);
//       // res.json("Email sent successfully OK");
//     } catch (error) {
//       console.log("@error", error);
//     }
//   }
// });

// router.post("/sendMail", async function (req, res, next) {
//   res.json("ok");
//   Email.find({ name: "Mail_Approve" }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       sendMail(rs[0]);
//     }
//   });

//   async function sendMail(e) {
//     e.value.content = e.value.content.replace(
//       /!ControlID/g,
//       `${req.body[0].ControlID}`
//     );
//     e.value.content = e.value.content.replace(
//       /!Applicant/g,
//       `${req.body[0].requester}`
//     );
//     e.value.content = e.value.content.replace(
//       /!Link/g,
//       `<a href='${url}ApproveFormConfirm?id=${req.body[0].id}'>IT asset takeout</a>`
//     );
//     console.log(req);

//     // res.json(e)
//     let transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "notifications@kyocera.co.th",
//         pass: "NRP@&Sep22",
//       },
//       // auth: mail[0].auth,
//     });
//     try {
//       // let new_user = req.body.map((d)=>{
//       //   let email
//       //   // if (d.email == "wichit-p@kyocera.co.th") email = "thaksin-b@kyocera.co.th"
//       //   // if (d.email == "thanomjit-t@kyocera.co.th") email = "thaksin-b@kyocera.co.th"
//       //   // if (d.email == "takashi-okunosono@kyocera.co.th") email = "thaksin-b@kyocera.co.th"

//       //   // // if (d.email == "aekasit-i@kyocera.co.th") email = "aekasit-i@kyocera.co.th"
//       //   // // if (d.email == "chonticha-n@kyocera.co.th") email = "chonticha-n@kyocera.co.th"
//       //   // // if (d.email == "natthapong-m@kyocera.co.th") email = "natthapong-m@kyocera.co.th"

//       //   // if (d.email == "aekasit-i@kyocera.co.th") email = "thaksin-b@kyocera.co.th"
//       //   // if (d.email == "chonticha-n@kyocera.co.th") email = "thaksin-b@kyocera.co.th"
//       //   // if (d.email == "natthapong-m@kyocera.co.th") email = "thaksin-b@kyocera.co.th"
//       //   return{
//       //     ...d,
//       //     newemail : email
//       //   }
//       // })
//       // console.log(new_user);
//       // console.log(e.value.content);

//       for (const user of req.body) {
//         console.log(
//           `Send E_Mail Approve : ${moment().format()} => email : ${user.email}`
//         );
//         console.log(`Link : ${e.value.content}`);

//         let info;
//         // info = await transporter.sendMail({
//         //   from: "notifications@kyocera.co.th", // sender address
//         //   to: 'natthapong-m@kyocera.co.th', // list of receivers
//         //   // to: user.email, // list of receivers

//         //   cc: [],
//         //   subject: e.value.subject, // Subject line
//         //   html: e.value.content,
//         // });
//       }
//       // res.json(info);
//       res.json("Email sent successfully OK");
//     } catch (error) {
//       console.log("@error", error);
//     }
//   }
// });

router.post("/testmail", async function (req, res, next) {
  // string.replace(searchValue, newValue)
  req.body.value.content = req.body.value.content.replace(
    /!Link/g,
    `<a href='${url}ApproveFormConfirm?id=12345'>IT asset takeout</a>`
  );
  // console.log(`<a href='${url}ApproveFormConfirm?id=12345'>IT asset takeout</a>`);
  req.body.value.content = req.body.value.content.replace(
    /!ControlID/g,
    `IT0000-0000`
  );
  req.body.value.content = req.body.value.content.replace(
    /!Applicant/g,
    `Requester`
  );
  req.body.value.content = req.body.value.content.replace(/!Day/g, `999`);
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "notifications@kyocera.co.th",
      pass: "NRP@&Sep22",
    },
    // auth: mail[0].auth,
  });
  try {
    console.log(req.body.email);
    let info;
    info = await transporter.sendMail({
      from: "notifications@kyocera.co.th", // sender address
      to: req.body.email, // mail user login
      // to: "thaksin-b@kyocera.co.th", // list of receivers
      // to: list, // list of receivers
      cc: [],
      subject: req.body.value.subject, // Subject line
      html: req.body.value.content,
    });

    // res.json(info);
    res.json("Email sent successfully OK");
  } catch (error) {
    console.log("@error", error);
  }
});

// //approve_success
// router.post("/Approve_Success", async function (req, res, next) {
//   res.json("ok");
//   Email.find({ name: "Mail_Requester" }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       reject(rs[0]);
//     }
//   });

//   // console.log(req.body);
//   async function reject(e) {
//     let tableContent = `<p>Approved</p>
//       <table style="border-collapse: collapse; width: 100%;">
//         <tr>
//           <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
//           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
//           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
//           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
//         </tr>
//       `;
//     for (const [index, item] of req.body.asset.entries()) {
//       tableContent += `
//        <tr>
//          <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
//            index + 1
//          }</td>
//          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//            item.value
//          }</td>
//          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//            item.name
//          }</td>
//          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//            item.period
//          }</td>
//        </tr>
//         `;
//     }
//     tableContent += "</table>";

//     e.value.content = e.value.content.replace(/!Status/g, `Complete`);
//     e.value.content = e.value.content.replace(
//       /!ControlID/g,
//       `${req.body.ControlID}</br>${tableContent}`
//     );
//     e.value.content = e.value.content.replace(
//       /!Link/g,
//       `<a href='${url}ApproveFormConfirm?mode=${req.body._id}'>IT asset takeout</a>`
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
//       // auth: mail[0].auth,
//     });
//     try {
//       console.log(
//         `Approve success : ${moment().format()} => email : ${req.body.email}`
//       );
//       // console.log(req.body);

//       let info;
//       info = await transporter.sendMail({
//         from: "notifications@kyocera.co.th", // sender address
//         // to: req.body.email, // list of receivers
//         to: req.body.email[0], // list of receivers
//         // to: user.email, // list of receivers
//         cc: req.body.email,
//         subject: e.value.subject, // Subject line
//         html: e.value.content,
//       });

//       // res.json(info);
//       // res.json("Email sent successfully OK");
//     } catch (error) {
//       console.log("@error", error);
//     }
//   }
// });

// cron.schedule("0 30 9 * * *", function () {
//     intervalFunc();
//   });

// router.post("/reserve_approve", async function (req, res, next) {
//   res.json("ok");
//   let req_filter = {
//     ControlID: req.body.ControlID,
//     "takeout.Approve_Step": 1,
//   };
//   // reserve
//   setTimeout(() => {
//     Approve_data.find(req_filter, function (err, rs) {
//       if (err) {
//         res.json(err);
//       } else {
//         if (rs.length != 0) {
//           count_item(rs[0]);
//           ToLevel3Division(rs[0]);
//         }
//       }
//     });
//   }, 1000 * 1 * 10);

//   function count_item(data) {
//     Email.find({ name: "Mail_Requester" }, function (err, rs) {
//       if (err) {
//         res.json(err);
//       } else {
//         reject(rs[0]);
//       }
//     });

//     async function reject(e) {
//       let tableContent = `
//     <table style="border-collapse: collapse; width: 100%;">
//       <tr>
//         <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
//         <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
//         <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
//         <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
//       </tr>
//     `;
//       for (const [index, item] of req.body.asset.entries()) {
//         tableContent += `
//      <tr>
//        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
//          index + 1
//        }</td>
//        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//          item.value
//        }</td>
//        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//          item.name
//        }</td>
//        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//          item.period
//        }</td>
//      </tr>
//       `;
//       }
//       tableContent += "</table>";
//       e.value.content = e.value.content.replace(
//         "Status : ",
//         `Please confirm.</br><span style="color:#1d76db;">${req.body.approve_name}</span> allowed <span style="color:#1d76db;">${req.body.reserve_name}</span> to approve instead.`
//       );
//       e.value.content = e.value.content.replace("!Status", ` `);
//       e.value.content = e.value.content.replace(
//         /!Applicant/g,
//         `${req.body.requester}`
//       );
//       e.value.content = e.value.content.replace(
//         /!ControlID/g,
//         `${req.body.ControlID}</br>${tableContent}`
//       );
//       e.value.content = e.value.content.replace(
//         /!Link/g,
//         `<a href='${url}ApproveFormConfirm?reserve=${req.body._id}'>IT asset takeout</a>`
//       );

//       // res.json(e)
//       let transporter = nodemailer.createTransport({
//         host: "smtp.office365.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: "notifications@kyocera.co.th",
//           pass: "NRP@&Sep22",
//         },
//       });
//       try {
//         console.log(
//           `Approve reserve mail: ${moment().format()} => email : ${
//             req.body.reserve
//           }`
//         );

//         let info;
//         info = await transporter.sendMail({
//           from: "notifications@kyocera.co.th", // sender address
//           to: "thaksin-b@kyocera.co.th", // list of receivers
//           cc: [],
//           subject: e.value.subject, // Subject line
//           html: e.value.content,
//         });
//       } catch (error) {
//         console.log("@error", error);
//       }
//     }
//   }

//   function ToLevel3Division(data) {
//     Email.find({ name: "Mail_Requester" }, function (err, rs) {
//       if (err) {
//         res.json(err);
//       } else {
//         reject(rs[0]);
//       }
//     });

//     async function reject(e) {
//       let tableContent = `
//     <table style="border-collapse: collapse; width: 100%;">
//       <tr>
//         <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
//         <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
//         <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
//         <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
//       </tr>
//     `;
//       for (const [index, item] of req.body.asset.entries()) {
//         tableContent += `
//      <tr>
//        <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
//          index + 1
//        }</td>
//        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//          item.value
//        }</td>
//        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//          item.name
//        }</td>
//        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
//          item.period
//        }</td>
//      </tr>
//       `;
//       }
//       tableContent += "</table>";
//       e.value.content = e.value.content.replace(
//         "Status : ",
//         `Allow <span style="color:#1d76db;">${req.body.reserve_name}</span> to approve`
//       );
//       e.value.content = e.value.content.replace("!Status", ` `);

//       e.value.content = e.value.content.replace(
//         /!Applicant/g,
//         `${req.body.requester}`
//       );
//       e.value.content = e.value.content.replace(
//         /!ControlID/g,
//         `${req.body.ControlID}</br>${tableContent}`
//       );
//       e.value.content = e.value.content.replace(
//         /!Link/g,
//         `<a href='${url}ApproveFormConfirm?id=${req.body._id}'>IT asset takeout</a>`
//       );

//       // res.json(e)
//       let transporter = nodemailer.createTransport({
//         host: "smtp.office365.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: "notifications@kyocera.co.th",
//           pass: "NRP@&Sep22",
//         },
//       });
//       try {
//         console.log(
//           `Approve requester mail: ${moment().format()} => email : ${
//             req.body.requester_email
//           }`
//         );

//         let info;
//         info = await transporter.sendMail({
//           from: "notifications@kyocera.co.th", // sender address
//           to: "thaksin-b@kyocera.co.th", // list of receivers
//           cc: [],
//           subject: e.value.subject, // Subject line
//           html: e.value.content,
//         });
//       } catch (error) {
//         console.log("@error", error);
//       }
//     }
//   }
// });

module.exports = router;
