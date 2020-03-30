const router = require('express').Router();
const verify = require('../middleware/verify');
const User = require("../../models/User");

// router.get('/', verify, async (req, res) => {
//     try{
//         const users = await User.find({});
//         res.json(users);
//     }catch(err){
//         res.json({message: err});
//     }
// });


router.get('/:userId', verify, async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
});

router.delete("/:userId", async (req, res) => {
    try{
        const removedUser = await User.deleteOne({_id: req.params.userId});
        res.json(removedUser);
    } catch(err){
        res.json({message: err});
    }
});

router.put("/:userId", async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body);
        res.json(updatedUser);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;