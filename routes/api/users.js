const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//User Model
const User = require("../../models/User");

//@route  POST api/users
//@desc   Register User
//@access Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more caharacters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    //TO DO:
    //See user exist
    //Get users gravatar
    //Encrypt password
    //Return jsonwebtoken

    res.send("User Route");
  }
);

module.exports = router;
