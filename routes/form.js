const express = require("express");
const router = express.Router();
const formController = require("../controllers/form");
const userMiddlewares = require("../middlewares/user");

router.get("/:formId", formController.getFormById);
router.post("/", userMiddlewares.isLoggedIn, formController.createForm);
router.put("/:formId", formController.updateForm);
router.delete("/:formId", formController.deleteForm);

module.exports = router;
