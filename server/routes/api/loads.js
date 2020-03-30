const router = require('express').Router();
const verify = require('../middleware/verify');
const Load = require("../../models/Load");
const Truck = require("../../models/Truck");

router.get('/', verify, async (req, res) => {

    try {
        const loads = await Load.find({
            created_by: req.user._id
        });
        res.json(loads);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/', verify, async (req, res) => {
    const load = new Load({
        title: req.body.title,
        dimensions: req.body.dimensions,
        payload: req.body.payload,
        created_by: req.user._id
    });

    try {
        const savedLoad = await load.save();
        res.json(savedLoad);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.get('/:loadId', verify, async (req, res) => {
    try {
        const load = await Load.findById(req.params.loadId);
        res.json(load);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.delete("/:loadId", async (req, res) => {
    try {
        const removedLoad = await Load.deleteOne({
            _id: req.params.loadId
        });
        res.json(removedLoad);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.put("/:loadId", async (req, res) => {
    try {
        const updatedLoad = await Load.findByIdAndUpdate(req.params.loadId, req.body);
        res.json(updatedLoad);

    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.put("/post/:loadId", async (req, res) => {
    try {

        const postedLoad = await Load.findByIdAndUpdate(req.params.loadId, {
            $set: {
                status: "POSTED"
            }
        });
        res.json(postedLoad);

    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.post("/assign/:loadId", async (req, res) => {
    try {
        const load = await Load.findById(req.params.loadId);
        if (load.status === 'NEW') {
            const loadShipper = load.created_by;
            const readyTruck = await Truck.findOne({
                status: "IS"
            });
            const readyDriver = readyTruck.created_by;
            console.log(readyTruck);
            console.log(load);
            if (readyTruck) {
                const assignedLoad = await Load.findByIdAndUpdate(req.params.loadId, {
                    $set: {
                        status: "ASSIGNED",
                        state: "En route to Pick Up",
                        assigned_to: readyDriver
                    }
                });
                const assignedTruck = await Truck.findByIdAndUpdate(readyTruck._id, {
                    $set: {
                        status: 'OL',
                        assigned_to: loadShipper
                    }
                });
                res.json(assignedLoad);
            } else {
                return res.status(400).send("TRUCK WITH STATUS -IS- NOT FOUND!");
            }
        } else {
            return res.status(400).send("THE LOAD IN PROCCES!PLS, TRY TO ASSIGN ANOTHER LOAD");
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
})

module.exports = router;