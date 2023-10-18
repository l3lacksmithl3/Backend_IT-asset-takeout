let express = require("express");
let router = express.Router();
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const Approve_data = require("../schema/Approve_data");
const moment = require("moment");
const cron = require("node-cron");

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  Approve_data.insertMany(payload, function (err, rs) {
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
  Approve_data.findById({ _id: id }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// find all
router.get("/", function (req, res, next) {
  Approve_data.find(function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.get("/lastData", async function (req, res, next) {
  const data = await Approve_data.aggregate([{ $match: {} }])
    .sort({ updatedAt: -1 })
    .limit(1);
  res.json(data[0]?.updatedAt);
});

// * update
router.put("/insert/:id", function (req, res, next) {
  const { id } = req.params;
  const payload = req.body;
  Approve_data.findByIdAndUpdate(
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

router.post("/delete", function (req, res, next) {
  const { id } = req.params;
  const payload = req.body;
  Approve_data.updateMany(
   { "takeout.Approve_Step": 1},
   { $unset: { reason: "" , reject: ""} },
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
  Approve_data.findByIdAndDelete({ _id: id }, function (err, rs) {
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
  Approve_data.aggregate([
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
  let data = await Approve_data.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  Approve_data.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  Approve_data.deleteMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// router.post("/getByAggregate", function (req, res, next) {
//   const payload = req.body;
//   console.log(payload);
//   let key = payload["takeout.section"].slice(0, 2);
//   console.log();
//   Approve_data.aggregate([
//     {
//       $match: {
//         "takeout.position_code": new RegExp(`^${key}.*`, "i"),
//         "takeout.Approve_Step": payload.Approve_Step,
//         "takeout.level": { $lt: payload.level },
//       },
//     },
//   ])
//     // .sort({ registerNo: -1 })
//     // .limit(1)
//     .exec((err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(result);
//       }
//     });
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

cron.schedule("0 40 7 * * *", function () {
  intervalFunc();
});
//---------------------------------------------------------------------------------------------------------------

function intervalFunc() {
  // let data = Approve_data.find({ ITassetsNo_1 : "KTC22015N"}, function (err, rs) {
  //   console.log(data);
  // });
  Approve_data.find(
    { Approve_Step: 3, BusinessModel: "IT asset takeout application form" },
    async function (err, rs) {
      if (err) {
        // res.json(err);
      } else {
        //---------------------------------------------------------------------------------------------//

        for (const item of rs) {
          // console.log(item._id);
          // console.log(item.name);
          // console.log(item.email);
          // console.log(item.ControlID);
          // console.log(moment(item.ToDate).diff(moment().format(), "day"));
          // if (moment(item.ToDate).diff(moment().format(), "day") == 2) {
          //   console.log("Over", item.ControlID, item.email);
          //   // let data = await Approve_data.updateMany({_id:item._id}, { $set: {} });
          //   // console.log(data);
          // }
          switch (moment(item.ToDate).diff(moment().format(), "day")) {
            case 2:
              console.log("Over", item.ControlID, item.email);
              break;
            case 0:
              console.log("Over", item.ControlID, item.email);
              break;
            case -5:
              console.log("Over", item.ControlID, item.email);
              break;

            default:
              break;
          }
        }

        //---------------------------------------------------------------------------------------------//
      }
    }
  );
}

// setInterval(intervalFunc, 5000);
// intervalFunc();

module.exports = router;
