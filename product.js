const express = require("express");
const { verifyToken } = require("./verifyToken");
const product = require("../model/Product");

const router = express.Router();

//Create new product
router.post("/", verifyToken, async (req, res, next) => {
    const product = new product(req.body);
    try {
        const newProduct = await product.save();
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

//UPDATE A PRODUCT
router.put("/:id", verifyToken, async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }

});

//DELETE A PRODUCT

router.delete("/:id", verifyToken, async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedProduct = await product.findByIdAndDelete(id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL PRODUCTS

router.get("/", verifyToken, async (req, res, next) => {
    try {
        const products = await product.find();
        !product && res.
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;