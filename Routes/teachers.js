const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth_m = require('../Middleware/auth_m');
const Teacher = require('../Models/teacherModel');
const User = require('../Models/userModel');

//store student data
router
  .route('/teachers')
  .post(
    [auth_m, [body('subject', 'Subject required!').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await User.findById(req.user.id).select('-password');

        const newTea = {
          subject: req.body.subject,
          name: user.name,
          user: req.user.id,
        };

        let profile = await Teacher.findOne({ user: req.user.id });

        if (profile) {
          //update the profile
          profile = await Teacher.findOneAndUpdate(
            { user: req.user.id },
            { $set: newTea },
            { new: true }
          );

          return res.json(profile);
        }

        const teacher = new Teacher(newTea);
        await teacher.save();

        res.json(teacher);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
      }
    }
  );

//Get all the teachers
router.route('/teachers').get(auth_m, async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ date: -1 });
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

//Delete teacher
router.route('/teachers').delete(auth_m, async (req, res) => {
  try {
    await Teacher.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json('Teacher removed!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
