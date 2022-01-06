const express = require("express");
const router = express.Router();
const db = require("../db-models/db-models.js");
const userController = require("../controller/userController.js");

router.post("/", userController.signup, (req, res) => {
  res.status(200).json(res.locals.newUser)
});
router.post("/login", userController.login, (req, res) => {
  if (res.locals.error) {
    res.status(400).json({ error: res.locals.error });
  }
  if (res.locals.message) {
    res.status(200).json({ message: res.locals.message });
  }
});
router.put("/:id", userController.update, async (req, res) => {
  return res.status(200).json("User Details updated successfully");
})
router.post("/details/:id", userController.createDetails, async (req, res) => {
  res.status(200).json("successfully created users details")
});
router.get("/details/:id", userController.getDetails, (req, res) => {
  res.status(200).json(res.locals.data);
});
router.put("/details/:id", userController.updateDetails, (req, res) => {
  res.status(200).json(res.locals.userDetails)
});

module.exports = router;
