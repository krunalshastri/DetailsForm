const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');

router
  .route('/users')
  .post(
    body('name', 'Name is required!').not().isEmpty(),
    body('email', 'Please include a valid email!').isEmail(),
    body(
      'password',
      'Please enter a password having 4 or more characters!'
    ).isLength({ min: 4 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      try {
        const U = await User.findOne({ email });

        if (U) {
          res.status(400).json('User already registered!');
        }
        const user = new User({
          name,
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json(token);
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error!');
      }
    }
  );

module.exports = router;
