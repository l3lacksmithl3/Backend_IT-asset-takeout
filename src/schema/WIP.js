const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List = new Schema(
    {
      date: Date,
      // model: String,
      // value: [],
    },
    // { timestamps: true, versionKey: false, strict: false }
    { timestamps: true, versionKey: false, strict: false }
  );

const ListModule = mongoose.model("WIP", List);

module.exports = ListModule;

