const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const {register, getAllUsers, login} = require("./controller/userController");
const {createPost, getPosts} = require("./controller/postController");

const url = "mongodb://127.0.0.1:27017/webforum?directConnection=true";


app.use(express.json());
app.use(cors({
    credentials: true,
    methods: ["GET", "POST"],
    origin: true,
}));
app.post("/user", register);
app.get("/user", getAllUsers);
app.post("/login", login);
app.post("/thread", createPost);
app.get("/thread", getPosts);


const start = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("DB connection successfull");
        }).catch((err) => {
            console.log(err.message);
        });
        const server = app.listen(port, ()=>
            console.log(`Server started on port ${port}`)
        );
    }
    catch (ex) {
        console.log(ex);
    }
}

start();
