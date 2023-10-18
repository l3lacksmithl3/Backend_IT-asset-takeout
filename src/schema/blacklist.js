const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List = new Schema(
    {
      // model: String,
      // value: [],
    },
    // { timestamps: true, versionKey: false, strict: false }
    { timestamps: true, versionKey: false, strict: false }
  );

const ListModule = mongoose.model("blacklist", List);

module.exports = ListModule;