


const router = express.Router();

//Create an order

router.post("/", verifyToken, async (req, res, next) => {
    const order = new Order(req.body);
    try {
        const saveOrder = await order.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update an order

router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});
