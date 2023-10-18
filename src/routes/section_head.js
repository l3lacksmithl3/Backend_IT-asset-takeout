let express = require("express");
let router = express.Router();
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const Approve_data = require("../schema/section_head");
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




// setInterval(intervalFunc, 5000);
// intervalFunc();

module.exports = router;
