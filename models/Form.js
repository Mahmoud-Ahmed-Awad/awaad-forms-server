const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loginRequired: {
    type: Boolean,
    default: false,
  },
  responseLimit: {
    type: Number,
    default: 0,
  },
  responseLimitPerUser: {
    type: Number,
    default: 0,
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Question",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  isMultipleResponses: {
    type: Boolean,
    default: false,
  },
  publicResponseable: {
    type: Boolean,
    default: true,
    required: false,
  },
  responseableUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: false,
  },
  editableUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: false,
  },
  viewResponseableUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: false,
  },
  // editableRoles: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "Role",
  //   required: false,
  // },
  // responseableRoles: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "Role",
  //   required: false,
  // },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
