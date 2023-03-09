const mongoose = require("mongoose");
const User = require("./schema/userModel");

const url = "mongodb://127.0.0.1:27017/webforum";

async function DoesUserExist(login) {
    await mongoose.connect(url);
    const user = await User.find({login: login});
    return !!user;
}

async function GetUserByLogin(login) {
    await mongoose.connect(url);
    return User.findOne({login: login});
}

async function AddUser(login, password) {
    await mongoose.connect(url);
    const user = new User({login: login, password: password});
    await user.save();
    console.log("1 document added");
}

async function GetAllUsers() {
    await mongoose.connect(url);
    return User.find();
}

module.exports = {GetUserByLogin, AddUser, GetAllUsers, DoesUserExist};
