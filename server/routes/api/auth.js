require('dotenv').config()
const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {registerValidation, loginValidation} = require('./auth-validation');
const verify = require('../middleware/verify')


router.post('/register', async (req, res) => {

    // // VALIDATION
    // const {error} = registerValidation(req.body);
    // //if(error) return res.status(400).send(error.details[0].message);

    const { name, email, role, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: [{ msg: 'user already exits' }] });
      }
      user = new User({
        name,
        email,
        role,
        password
      });

      // password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // sign a jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: 36000
      },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
});


//LOGIN 

router.post('/login', async (req, res) => {

    // //VALIDATION
    // const {error} = loginValidation(req.body);
    // //if(error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
      // match password with bcrypt
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
      // sign a jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, process.env.TOKEN_SECRET,
        (err, token) => {
          if (err) throw err
          res.json({ token });
        }
      )

    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }

});

router.get('/login', verify, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })


module.exports = router;