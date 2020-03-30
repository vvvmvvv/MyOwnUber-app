const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {registerValidation, loginValidation} = require('./auth-validation');


router.post('/register', async (req, res) => {

    // VALIDATION
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email is already exist");

    //hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    try {
        await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


//LOGIN 

router.post('/login', async (req, res) => {

    //VALIDATION
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password");

    //Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('authorization', token);
    console.log({name: user.name, role: user.role });
    res.send(200,token, {name: user.name, role: user.role });
});



module.exports = router;