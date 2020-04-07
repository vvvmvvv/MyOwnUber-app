const router = require('express').Router();
const verify = require('../middleware/verify');
const Truck = require("../../models/Truck");
const User = require("../../models/User");

router.get('/', verify, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        if(user.role !== "DRIVER"){
            return res.status(400).send("THIS FUNCTIONALITY ONLY FOR DRIVER!");
        }
        const trucks = await Truck.find({created_by: req.user.id});
        res.json(trucks);
    }catch(err){
        res.json({message: err.message});
    }
});

router.post('/', verify, async (req, res) => {
    const truck = new Truck({
        title: req.body.title,
        type: req.body.type,
        payload: req.body.payload,
        created_by: req.user.id
    });

    try{
        const savedTruck = await truck.save();
        res.json(savedTruck);
    }catch(err) {
        res.json({message: err.message});
    }
});

router.get('/:truckId', verify, async (req, res) => {
    try{
        const truck = await Truck.findById(req.params.truckId);
        res.json(truck);
    }catch(err){
        res.json({message: err.messager});
    }
});

router.delete("/:truckId",verify,  async (req, res) => {
    try{
        const removedTruck = await Truck.deleteOne({_id: req.params.truckId});
        res.json(removedTruck);
    } catch(err){
        res.json({message: err.message});
    }
});

router.put("/:truckId", verify, async (req, res) => {
    try{
        const updatedTruck = await Truck.findByIdAndUpdate(req.params.truckId,req.body);
        res.json(updatedTruck);

    }catch(err){
        res.json({message: err.message});
    }
});

router.put("/assign/:truckId", verify, async (req, res) => {
    try {
        const user = await User.findOne({_id : req.user.id, role: "DRIVER"});
        if(!user){
            return res.status(404).send("You not the Driver!");
        }
        const assignedTruck = await Truck.findOne({assigned_to: user._id});
        if(assignedTruck){
            return res.status(403).send("You cannot assign more than one truck!");
        }
        const truck = await Truck.findOneAndUpdate({
            _id: req.params.truckId,
            status: 'IS'
        }, {
            $set: {
                assigned_to: req.user.id
            }
        }, {new: true});

        if (!truck) {
            return res.status(400).send("TRUCK WITH STATUS -IS- NOT FOUND!");
        }

        res.json(truck);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

module.exports = router;