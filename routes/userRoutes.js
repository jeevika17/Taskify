const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req,res) => {
    res.send('User routes are working!');
});

//register a user
router.post('/register', async (req,res) => {
    const { name, email, password } = req.body;
    try{
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ user , message : "User created sucessfully"});
    }
    catch (err){
        res.status(400).send({ error: err });
    }
});

//login a user
router.post('/login', async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            throw new Error('Unable yo login, Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('Unable yo login, Invalid credentials');   
        }

        const token = jwt.sign({
            _id : user._id.toString()
        }, process.env.JWT_SECRET_KEY);
        
        res.send({ user, token, message: "Logged in successfully" });

    }
    catch (err){
        res.status(400).send({ error: err });
    }
});



module.exports = router;
