const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc login user
//@route get /api/users
//@access public

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    const user = await User.findOne({email});
    
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username : user.username,
                    email: user.email,
                    id:user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : "15m" }
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@desc register user
//@route post /api/users
//@access public

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email}); 
        
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if(user){
        res.status(201).json({_id: user.id, email: user.email });
    }
    else{
        res.status(400);
        throw new Error("Something went wrong");
    }
});

//@desc get single user
//@route get /api/users/:id
//@access private

const getUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user);
});


module.exports = {loginUser, registerUser, getUser}