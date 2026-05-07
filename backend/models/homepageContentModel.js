const mongoose = require("mongoose");

const todaysResultSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    points: { type: String, required: true, trim: true },
    note: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const homepageContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "homepage" },
    todaysResults: {
      type: [todaysResultSchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("HomepageContent", homepageContentSchema);
