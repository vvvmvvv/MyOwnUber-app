const router = require('express').Router();
const verify = require('../middleware/verify');
const Load = require("../../models/Load");
const Truck = require("../../models/Truck");
const User = require("../../models/User");

router.get('/', verify, async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        if(user.role !== "SHIPPER"){
            return res.status(400).send("THIS FUNCTIONALITY ONLY FOR SHIPPER!");
        }
        const loads = await Load.find({
            created_by: req.user.id
        });
        res.json(loads);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const load = new Load({
            title: req.body.title,
            dimensions: req.body.dimensions,
            payload: req.body.payload,
            created_by: req.user.id
        });

        const savedLoad = await load.save();
        res.json(savedLoad);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

router.get('/:loadId', verify, async (req, res) => {
    try {
        const load = await Load.findById(req.params.loadId);
        res.json(load);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

router.delete("/:loadId",verify, async (req, res) => {
    try {
        const load = await Load.findById(req.params.loadId);
        if(load.status === 'NEW'){
            const removedLoad = await Load.findByIdAndRemove(req.params.loadId);
            res.json(removedLoad);
        } else {
            return res.status(400).send("LOAD WITH STATUS -NEW- NOT FOUND!");
        }
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

router.put("/:loadId",verify, async (req, res) => {
    try {
        const load = await Load.findById(req.params.loadId);
        if(load.status === 'NEW'){
            const updatedLoad = await Load.findByIdAndUpdate(req.params.loadId, req.body);
            res.json(updatedLoad);
        } else {
            return res.status(400).send("LOAD WITH STATUS -NEW- NOT FOUND!");
        }

    } catch (err) {
        res.json({
            message: err.message
        });
    }
})

function getTruckType({width, height, length}, payload) {
    if (payload <= 1700 && width <= 300 && length <= 250 && height <= 170) {
        return "sprinter";
    }

    if (payload <= 2500 && width <= 500 && length <= 250 && height <= 170) {
        return "small straight";
    }

    if (payload <= 4000 && width <= 700 && length <= 350 && height <= 200) {
        return "large straight";
    }

    return "Very big";
}

router.put("/post/:loadId", verify, async (req, res) => {
    try {
        const load = await Load.findOne({
            _id: req.params.loadId,
            status: "NEW"
        }); 
        if (!load) return res.status(404).json({message: "Load not found"});
        const truckType = getTruckType(load.dimensions, load.payload);
    
        const readyTruck = await Truck.findOne({
            status: "IS",
            type: truckType
        });

        if(!readyTruck){
            return res.status(404).send("TRUCK WITH STATUS -IS- NOT FOUND!");
        }

        await Load.findByIdAndUpdate(req.params.loadId, {
            $set: {
                status: "POSTED"
            }
        },{new: true});

        res.json(readyTruck);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
})

router.put("/assign/:loadId", verify, async (req, res) => {
    try {
        const load = await Load.findById(req.params.loadId);
        if (load.status === 'POSTED') {
            const truckType = getTruckType(load.dimensions, load.payload);
            const readyTruck = await Truck.findOne({
                status: "IS",
                type: truckType
            });
            const readyDriver = readyTruck.created_by;
            if (readyTruck) {
                await Load.findByIdAndUpdate(req.params.loadId, {
                    $set: {
                        status: "ASSIGNED",
                        state: "An route to Pick Up",
                        assigned_to: readyDriver
                    }
                });
                const assignedTruck = await Truck.findByIdAndUpdate(readyTruck._id, {
                    $set: {
                        status: 'OL',
                    }
                }, {new: true});
                res.json(assignedTruck);
            } else {
                return res.status(400).send("TRUCK WITH STATUS -IS- NOT FOUND!");
            }
        } else {
            return res.status(400).send("THE LOAD IN PROCCES!PLS, TRY TO ASSIGN ANOTHER LOAD");
        }
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

router.put("/arrived/:loadId", verify, async (req, res) => {
    try {
        const driver = await User.findOne({_id: req.user.id, role: "DRIVER"});
        if (!driver) {
            return res.status(403).json({
                message: "You cannot change load state"
            });
        }
        const load = await Load.findOne({_id: req.params.loadId, state: "An route to Pick Up", assigned_to: driver._id});
        if(!load) return res.status(400).send("LOAD NOT FOUND!");
            const readyToRoadLoad = await Load.findByIdAndUpdate(req.params.loadId,{
                $set: {
                    state: "Arrived to delivery"
                }
            }, {new: true});
            res.json(readyToRoadLoad);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});

router.put("/shipped/:loadId", verify, async (req, res) => {
    try {
        const load = await Load.findOne({_id: req.params.loadId, state: "Arrived to delivery"});
        if(!load) return res.status(400).send("LOAD NOT FOUND!");
            const shippedLoad = await Load.findByIdAndUpdate(req.params.loadId,{
                $set: {
                    status: "SHIPPED"
                }
            }, {new: true});
        await Truck.findByIdAndUpdate(load.assigned_to, {
            $set: {
                status: "IS"
            }
        }, {new: true});
            res.json(shippedLoad);
    } catch (err) {
        res.json({
            message: err.message
        });
    }
});



module.exports = router;