const User = require("../schema/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const MAX_AGE = 24*60*60 // 1/1000 of a day in milliseconds

function createToken(id) {
    return jwt.sign({id}, "secret-key", {
        expiresIn: MAX_AGE,
    });
}

async function register(req, res, next) {
    try {
        const {login, password} = req.body;
        const loginCheck = await User.findOne({login});
        if (loginCheck) {
            return res.status(400).json("User already exists");
        }
        const hashed = await bcrypt.hash(password, 2);
        const user = await User.create({login, password: hashed});
        const token = createToken(user._id)
        res.cookie("jwt", token, {
            httpOnly: false,
            Secure: false,
            maxAge: MAX_AGE * 1000,
        });
        res.status(201).json({user: user, created: true});
    }
    catch (ex) {
        console.log(ex);
    }
}

async function login(req, res, next) {
    try {
        const {login, password} = req.body;
        const user = await User.findOne({login});
        if (!user) {
            return res.status(400).json("Incorrect username");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json("Incorrect password");
        }
        const token = createToken(user._id);
        res.cookie("jwt", token, {
/*            withCredentials: false,
            httpOnly: false,
            Secure: false,*/
            maxAge: MAX_AGE * 1000,
        });
        res.status(200).json({user: user._id, created: true});
    }
    catch (ex) {
        console.log(ex);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find().select(["login", "password"]);
        res.status(200).json(users);
    }
    catch (ex) {
        console.log(ex);
    }
}

module.exports = {register, getAllUsers, login};
