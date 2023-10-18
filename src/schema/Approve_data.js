const mongoose = require("mongoose");
const { Schema } = mongoose;

const List = new Schema(
  {
    FromDate: Date,
    ToDate: Date,

    date_end: Date,

    // model: String,
    // value: [],
  },
  // { timestamps: true, versionKey: false, strict: false }
  { timestamps: true, versionKey: false, strict: false }
);

const ListModule = mongoose.model("Approve_data", List);

module.exports = ListModule;
