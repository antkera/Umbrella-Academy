const { Schema, model } = require("mongoose");

const contentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    contentType: {
      type: String,
      enum: ["jpeg", "pdf", "png"],
    },
    contentData: String,
    visibility: {
      type: Boolean,
      required: true,
    },
    isHighlighted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = model("Content", contentSchema);

module.exports = Content;
