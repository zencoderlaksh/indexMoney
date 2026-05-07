const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: { type: String, required: true, trim: true, maxlength: 320 },
    content: { type: String, required: true, trim: true },
    coverImageUrl: { type: String, trim: true, default: "" },
    authorName: { type: String, trim: true, default: "Index Money" },
    metaTitle: { type: String, trim: true, maxlength: 70, default: "" },
    metaDescription: { type: String, trim: true, maxlength: 170, default: "" },
    keywords: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true },
);

blogSchema.index({ status: 1, publishedAt: -1 });

blogSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
