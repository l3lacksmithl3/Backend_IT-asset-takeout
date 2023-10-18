let express = require("express");
let router = express.Router();
// let nodemailer = require("nodemailer");
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const master_it = require("../schema/master_it");

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  master_it.insertMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

//  * find by id
// router.get("/:id", function (req, res, next) {
//   const { id } = req.params;
//   master_it.findById({ _id: id }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(rs);
//     }
//   });
// });

// find all
router.get("/", function (req, res, next) {
  master_it.find(function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// * update
router.put("/insert/:id", function (req, res, next) {
  const { id } = req.params;
  const payload = req.body;
  master_it.findByIdAndUpdate(
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
  master_it.findByIdAndDelete({ _id: id }, function (err, rs) {
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
  master_it
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
  let data = await master_it.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  master_it.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  master_it.deleteMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});



// thaksin-b@kyocera.co.th
// user: "notifications@kyocera.co.th",
// pass: "NRP@&Sep22",



// router.post("/sendMail", async function (req, res, next) {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.office365.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "notifications@kyocera.co.th",
//       pass: "NRP@&Sep22",
//     },
//     // auth: mail[0].auth,
//   });

//   try {
//     // let buffer = Buffer.from(req.body.test.data);
//     let info
//     //   info = await transporter.sendMail({
//     //     from: "notifications@kyocera.co.th", // sender address
//     //     to: "thaksin-b@kyocera.co.th", // list of receivers
//     //     // to: list, // list of receivers
//     //     cc: [],
//     //     subject: "[TEST]", // Subject line
//     //     html: `Dear <br/><br/>

//     //       ABCDEFG<br/>
//     //       HIJKLMNOP<br/>
//     //       QRSTUVWXYZ,<br/><br/>


//     //       <a href='http://localhost:4200/ApproveFormConfirm?id=${req.body.id}'>>>Click<<</a>
//     //       <br/>
//     //       `,
//     //   });

//     res.json(info);
//   } catch (error) {
//     console.log("@error", error);
//   }
// });

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
//---------------------------------------------------------------------------------------------------------------

module.exports = router;
