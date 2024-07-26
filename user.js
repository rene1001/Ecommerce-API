const express = require('express')
const User = require('../model/User')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const router = express.Router()



//update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET
        ).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ error });
        
    }
});

//delete

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json(deleteUser);
    } catch (error) {
        res.status(500).json({ error });
        
    }
});

//get a single user

router.get('/find/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
        
    }
});
//GET ALL USER
router.get('/:id',verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const users = await Users.find();
        users
            ? res.status(200).json(users)
            : res.status(404).json("users not found");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;