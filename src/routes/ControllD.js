let express = require("express");
let router = express.Router();
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const ControlID = require("../schema/ControlID");

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  ControlID.insertMany(payload, function (err, rs) {
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
//   ControlID.findById({ _id: id }, function (err, rs) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(rs);
//     }
//   });
// });

// find all
router.get("/", function (req, res, next) {
  ControlID.find(function (err, rs) {
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
  ControlID.findByIdAndUpdate(
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
  ControlID.findByIdAndDelete({ _id: id }, function (err, rs) {
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
  ControlID
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
  let data = await ControlID.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  ControlID.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  ControlID.deleteMany(payload, function (err, rs) {
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
