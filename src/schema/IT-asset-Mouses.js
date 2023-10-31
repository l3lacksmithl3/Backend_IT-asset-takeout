const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List = new Schema(
    {
      FromDate: Date,
      ToDate : Date,
      // model: String,
      // value: [],
    },
    // { timestamps: true, versionKey: false, strict: false }
    { timestamps: true, versionKey: false, strict: false }
  );

const ListModule = mongoose.model("IT-asset-Mouses", List);

module.exports = ListModule;

