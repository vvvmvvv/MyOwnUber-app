const router = require('express').Router();
const verify = require('../middleware/verify');
const User = require("../../models/User");
const bcrypt = require('bcryptjs');


router.get('/:userId', verify, async (req, res) => {
    try{
        if (!user) return res.status(404).json('USER not found');
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err.message});
    }
});

router.delete("/:userId", verify, async (req, res) => {
    try{
        let user = await User.findById(req.params.userId)
        if (!user) return res.status(404).json('USER not found');
        await User.findByIdAndRemove(req.params.userId)
        res.send('User Removed successfully')
        //const removedUser = await User.deleteOne({_id: req.params.userId});
        //res.json(removedUser);
    } catch(err){
        res.json({message: err.message});
    }
});

router.put("/:userId", verify,  async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json('USER not found');

        let { password, newPassword, newPasswordConfirmation } = req.body;
        if (password && newPassword && newPasswordConfirmation) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.json({message: "Invalid password"})
            }

            if (newPassword !== newPasswordConfirmation) {
                res.json({message: "Passwords does not match"});
            }

            const salt = await bcrypt.genSalt(10);
            newPassword = await bcrypt.hash(newPassword, salt);

            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {...req.body, password: newPassword}, {new: true});
            res.json({user: updatedUser, logout: true});
        } else {
            if (password || !password.length) {
                delete req.body.password;
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
            res.json({user: updatedUser, logout: false});
        }

    }catch(err){
        res.json({message: err.message});
    }
});

module.exports = router;