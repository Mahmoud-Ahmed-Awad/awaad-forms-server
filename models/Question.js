const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 3, maxlength: 255 },
  description: { type: String, required: true, minlength: 3, maxlength: 255 },
  // options: { type: [String], required: true, minlength: 2, maxlength: 255 },
  type: {
    type: String,
    required: true,
    enum: [
      "text",
      "number",
      "email",
      "phone",
      "date",
      "time",
      "checkbox",
      "radio",
      "select",
      "textarea",
    ],
  },
  required: { type: Boolean, required: true, default: false },
  minLength: { type: Number, required: false },
  maxLength: { type: Number, required: false },
  pattern: { type: String, required: false },
  placeholder: { type: String, required: false },

  quiz: { type: Boolean, required: true, default: false },
  quizOptions: { type: [String], required: false },
  quizAnswer: { type: String, required: false },
  quizExplanation: { type: String, required: false },
  quizPoints: { type: Number, required: false },
  quizNegativePoints: { type: Number, required: false },
  quizCorrectOption: { type: String, required: false },
  quizIncorrectOption: { type: String, required: false },
  quizCorrectAnswer: { type: String, required: false },
  quizIncorrectAnswer: { type: String, required: false },
  quizExplanation: { type: String, required: false },
  quizPoints: { type: Number, required: false },
  quizNegativePoints: { type: Number, required: false },
  quizCorrectOption: { type: String, required: false },
  quizIncorrectOption: { type: String, required: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  form: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },

  isDisabled: { type: Boolean, required: true, default: false },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
