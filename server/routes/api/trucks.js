const router = require('express').Router();
const verify = require('../middleware/verify');
const Truck = require("../../models/Truck");

router.get('/', verify, async (req, res) => {
    
    try{
        const trucks = await Truck.find({driver: req.user._id});
        res.json(trucks);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/', verify, async (req, res) => {
    const truck = new Truck({
        title: req.body.title,
        type: req.body.type,
        payload: req.body.payload,
        created_by: req.user._id
    });

    try{
        const savedTruck = await truck.save();
        res.json(savedTruck);
    }catch(err) {
        res.json({message: err});
    }
});

router.get('/:truckId', verify, async (req, res) => {
    try{
        const truck = await Truck.findById(req.params.truckId);
        res.json(truck);
    }catch(err){
        res.json({message: err});
    }
});

router.delete("/:truckId", async (req, res) => {
    try{
        const removedTruck = await Truck.deleteOne({_id: req.params.truckId});
        res.json(removedTruck);
    } catch(err){
        res.json({message: err});
    }
});

router.put("/:truckId", async (req, res) => {
    try{
        const updatedTruck = await Truck.findByIdAndUpdate(req.params.truckId,req.body);
        res.json(updatedTruck);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;