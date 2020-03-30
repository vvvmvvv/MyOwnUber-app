const router = require('express').Router();
const verify = require('../middleware/verify');
const Load = require("../../models/Load");

router.get('/', verify, async (req, res) => {
    
    try{
        const loads = await Load.find({shipper: req.user._id});
        res.json(loads);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/', verify, async (req, res) => {
    const load = new Load({
        title: req.body.title,
        dimensions: req.body.dimensions,
        payload: req.body.payload,
        created_by: req.user._id
    });

    try{
        const savedLoad = await load.save();
        res.json(savedLoad);
    }catch(err) {
        res.json({message: err});
    }
});

router.get('/:loadId', verify, async (req, res) => {
    try{
        const load = await Load.findById(req.params.loadId);
        res.json(load);
    }catch(err){
        res.json({message: err});
    }
});

router.delete("/:loadId", async (req, res) => {
    try{
        const removedLoad = await Load.deleteOne({_id: req.params.loadId});
        res.json(removedLoad);
    } catch(err){
        res.json({message: err});
    }
});

router.put("/:loadId", async (req, res) => {
    try{
        const updatedLoad = await Load.findByIdAndUpdate(req.params.loadId,req.body);
        res.json(updatedLoad);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;