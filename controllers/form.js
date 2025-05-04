const Form = require("../models/Form");
const Question = require("../models/Question");
const Response = require("../models/Response");
const User = require("../models/User");

const getFormById = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Form.findById(formId).populate("questions");
    const owner = await User.findById(form.owner).select(
      "firstName lastName avatar"
    );
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    form.owner = owner;
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    return res.status(200).json(form); // Return the form object
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createForm = async (req, res) => {
  const { name, description, questions } = req.body;
  const owner = req.user._id;
  try {
    const form = new Form({ name, description, owner });
    await questions.forEach(async (questionObj) => {
      const question = new Question(questionObj);
      question.form = form._id;
      form.questions.push(question._id);
      await question.save();
    });
    await form.save();
    return res.status(201).json(form);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateForm = async (req, res) => {
  const { formId } = req.params;
  const { name, description, questions } = req.body;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    form.name = name;
    form.description = description;
    form.questions = questions.map((question) => new Question(question));
    await form.save();
    return res.status(200).json(form);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteForm = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    await form.remove();
    return res.status(200).json({ message: "Form deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const submitForm = async (req, res) => {};

const getFormSubmissions = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    const answers = await Response.find({ formId });
    return res.status(200).json(answers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFormSubmission = async (req, res) => {
  const { formId, submissionId } = req.params;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    const answer = await Response.findById(submissionId);
    if (!answer) {
      return res.status(404).json({ message: "Submission not found" });
    }
    return res.status(200).json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFormSubmission = async (req, res) => {
  const { formId, submissionId } = req.params;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    const answer = await Response.findById(submissionId);
    if (!answer) {
      return res.status(404).json({ message: "Submission not found" });
    }
    await answer.remove();
    return res.status(200).json({ message: "Submission deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateFormSubmission = async (req, res) => {
  const { formId, submissionId } = req.params;
  const { answers } = req.body;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    const answer = await Response.findById(submissionId);
    if (!answer) {
      return res.status(404).json({ message: "Submission not found" });
    }
    answer.answers = answers;
    await answer.save();
    return res.status(200).json(answer);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getFormById,
  createForm,
  updateForm,
  deleteForm,
  submitForm,
  getFormSubmissions,
  getFormSubmission,
  deleteFormSubmission,
  updateFormSubmission,
};
