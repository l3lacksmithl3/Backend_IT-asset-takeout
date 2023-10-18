let express = require("express");
let router = express.Router();
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const Approve_data = require("../schema/Approve_data");
const email_form = require("../schema/email-form");
const Email = require("../schema/email-form");
const moment = require("moment");
const cron = require("node-cron");
let nodemailer = require("nodemailer");
const url = process.env.PathUrl;

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  email_form.insertMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

//  * find by id
router.get("/byId/:id", function (req, res, next) {
  const { id } = req.params;
  email_form.findById({ _id: id }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// find all
router.get("/", function (req, res, next) {
  email_form.find(function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.get("/lastData", async function (req, res, next) {
  const data = await email_form
    .aggregate([{ $match: {} }])
    .sort({ updatedAt: -1 })
    .limit(1);
  res.json(data[0]?.updatedAt);
});

// * update
router.put("/insert/:id", function (req, res, next) {
  const { id } = req.params;
  const payload = req.body;
  email_form.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    function (err, rs) {
      if (err) {
        res.json(err);
      } else {
        res.json(rs);
      }
    }
  );
});

// * delete
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  email_form.findByIdAndDelete({ _id: id }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      // res.json(rs);
      res.status(204).end();
    }
  });
});

//getLastData
router.get("/lastData/", function (req, res, next) {
  email_form
    .aggregate([
      {
        $match: {},
      },
    ])
    .sort({ registerNo: -1 })
    .limit(1)
    .exec((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
});

// deleteAll()
router.delete("/", async function (req, res, next) {
  let data = await email_form.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  email_form.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  email_form.deleteMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// router.put("/insert/:id", function (req, res, next) {
//   const { id } = req.params;
//   const payload = req.body;
//   master_employee.findByIdAndUpdate(
//     { _id: id },
//     { $set: payload},
//     function (err, rs) {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(rs);
//       }
//     }
//   );
// });

cron.schedule("0 30 9 * * *", function () {
  intervalFunc();
});

// intervalFunc();
//---------------------------------------------------------------------------------------------------------------

async function intervalFunc() {
  let data = [];
  let res_1 = await Approve_data.aggregate([
    {
      $match: {
        $or: [{ "return.Approve_Step": 1 }],
      },
    },
  ]);

  for (const item of res_1) {
    if (item?.return) {
      item.return.ControlID = item.ControlID;
      item.return._id = item._id;
      data.push(item.return);
    } else {
      item.takeout.ControlID = item.ControlID;
      item.takeout._id = item._id;
      data.push(item.takeout);
    }
  }

  // console.log(currentTimeString);
  // console.log(data);
  for (const job of data) {
    let asset = await job.item.map((e) => {
      let day1 = moment(e.period.split("-")[1], "ll").format("ll"); // Replace with your actual date
      let day2 = moment().format("ll"); // Replace with your actual date]
      let diffInDays = moment(day1, "ll").diff(moment(day2, "ll"), "days");
      return {
        ...e,
        last_period: e.period.split("-")[1].trim(),
        remain: diffInDays,
      };
    });

    console.log(asset);
    asset = asset.filter((e) => e.return == false);
    asset = asset.filter((e) => [3, 0, -2].includes(e.remain));

    if (asset.length > 0) {
      // console.log(asset);
      // console.log( aaa.length , job.ControlID , aaa[0]?.remain ,job._id,job.email,job.name);
      mailers(
        job.ControlID,
        asset[0]?.remain,
        job._id,
        job.email,
        job.name,
        asset
      );
    }
  }

  function mailers(ControlID, remain, id, email, requester, asset) {
    Email.find({ name: "Mail_Remain" }, function (err, rs) {
      if (err) {
        res.json(err);
      } else {
        sendMail(rs[0]);
      }
    });

    //TODO
    async function sendMail(e) {
      let tableContent = `<p>The list has been expanded.</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;background-color: blue; color: white;">No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset No.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Asset Type.</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Period</th>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;background-color: blue; color: white;">Remain</th>
        </tr>
      `;
      for (const [index, item] of asset.entries()) {
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
           item.remain
         }</td>
       </tr>
        `;
      }
      tableContent += "</table>";

      e.value.content = e.value.content.replace(
        /!Link/g,
        `<a href='${url}AppliedList'>IT asset takeout</a>`
      );
      e.value.content = e.value.content.replace(/!Day/g, `${remain}`);
      e.value.content = e.value.content.replace(/!Applicant/g, `${requester}`);
      e.value.content = e.value.content.replace(
        /!ControlID/g,
        `${ControlID} </br>${tableContent}`
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
      });
      try {
        console.log(`Remain : ${moment().format()} => email : ${email}`);
        // console.log(ControlID);
        let info;
        info = await transporter.sendMail({
          from: "notifications@kyocera.co.th", // sender address
          // to: "thaksin-b@kyocera.co.th", // list of receivers
          to: "natthapong-m@kyocera.co.th", // list of receivers
          cc: [],
          subject: e.value.subject, // Subject line
          html: e.value.content,
        });
      } catch (error) {
        console.log("@error", error);
      }
    }
  }

  //---------------------------------------------------------------------------------------------//
  // }
  // }
  // );
}

// setInterval(intervalFunc, 5000);
// intervalFunc();

module.exports = router;
