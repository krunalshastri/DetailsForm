const router = require('express').Router();
const auth_m = require('../Middleware/auth_m');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

router.route('/auth').get(auth_m, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
});

router
  .route('/auth')
  .post(
    body('email', 'Please include a valid email!').isEmail(),
    body('password', 'Password required!').exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials!' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials!' }] });
        }

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
            res.status(200).json({ profile: user, token });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error!');
      }
    }
  );

module.exports = router;
