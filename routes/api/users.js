const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

//User input validation
const { body, validationResult } = require("express-validator");
//Avatars
const gravatar = require("gravatar");
//Encryption for password
const bcrypt = require("bcryptjs");
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "User already exists" }] });
      }

      //Options for gravatar
      //s - size
      //r - rating (no nudity)
      //d - default avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //Create the User
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Payload with user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
