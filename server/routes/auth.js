const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Test route for now
router.get("/test", (req, res) => {
    res.send("Auth route working!");
});

//Register
router.post("/register", async(req, res) => {
    try{
        const { name, email, password } = req.body;

        //Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser)   return res.status(400).json({ message: "User already exists" });

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        res.status(500).json({ error: message });
    } 
});


//Login
router.post("/login", async(req, res) => {
    try{
        const { email, password } = req.body;

        //Find user
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "No user found"});
        
        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)    return res.status(400).json({ message: "Invalid password"});

        //Generate JWT
        const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});

        res.json({ token, user: { id: user._id, name: user.name, email: user.email} });
    }catch(err){
        res.status(500).json({ error: message });
    }
});

module.exports = router;