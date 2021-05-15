const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth_m = require('../Middleware/auth_m');
const Student = require('../Models/studentModel');
const User = require('../Models/userModel');

//store student data
router
  .route('/students')
  .post(
    [auth_m, [body('age', 'Age required!').isNumeric()]],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await User.findById(req.user.id).select('-password');

        const newStud = {
          age: req.body.age,
          name: user.name,
          user: req.user.id,
        };

        let profile = await Student.findOne({ user: req.user.id });

        if (profile) {
          //update the profile
          profile = await Student.findOneAndUpdate(
            { user: req.user.id },
            { $set: newStud },
            { new: true }
          );

          return res.json(profile);
        }

        const student = new Student(newStud);
        await student.save();

        res.json(student);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
      }
    }
  );

//Get all the students
router.route('/students').get(auth_m, async (req, res) => {
  try {
    const students = await Student.find().sort({ date: -1 });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

//Delete student
router.route('/students').delete(auth_m, async (req, res) => {
  try {
    await Student.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json('Student removed!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
