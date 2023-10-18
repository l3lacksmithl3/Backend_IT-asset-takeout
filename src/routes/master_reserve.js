let express = require("express");
let router = express.Router();
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------
// let nodemailer = require("nodemailer");
const master_section = require("../schema/master_reserve");

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  master_section.insertMany(payload, function (err, rs) {
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
//   master_section.findById({ _id: id }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(rs);
//     }
//   });
// });

// find all
router.get("/", function (req, res, next) {
  master_section.find(function (err, rs) {
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
  master_section.findByIdAndUpdate(
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
  master_section.findByIdAndDelete({ _id: id }, function (err, rs) {
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
  master_section
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
  let data = await master_section.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  master_section.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  master_section.deleteMany(payload, function (err, rs) {
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
//---------------------------------------------------------------------------------------------------------------

module.exports = router;
