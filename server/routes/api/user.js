const router = require('express').Router();
const verify = require('../middleware/verify');
const User = require("../../models/User");

router.get('/', verify, async (req, res) => {
    try{
        const users = await User.find({});
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});


router.get('/:userId', verify, async (req, res) => {
    try{
        if (!user) return res.status(404).json('USER not found');
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
});

router.delete("/:userId", verify, async (req, res) => {
    try{
        console.log("START DELETING ON BACK");
        let user = await User.findById(req.params.id)
        if (!user) return res.status(404).json('USER not found');
        await User.findByIdAndRemove(req.params.id)
        res.send('User Removed successfully')
        //const removedUser = await User.deleteOne({_id: req.params.userId});
        //res.json(removedUser);
    } catch(err){
        res.json({message: err});
    }
});

router.put("/:userId", verify,  async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body);
        res.json(updatedUser);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;