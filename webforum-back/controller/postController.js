const Posts = require("../schema/postModel");

async function createPost(req, res, next) {
    try {
        const {from, message} = req.body;
        const data = await Posts.create({
            from: from,
            message: message,
        });
        if (data) {
            return res.status(200).json("Post created successfully");
        }
        else {
            return res.status(400).json("Error");
        }
    }
    catch (ex) {
        console.log(ex);
    }
}

async function getPosts(req, res, next) {
    try {
        const posts = await Posts.find({message: {$regex : '.*' + '.*'}}).populate("from").sort({updatedAt: 1});
        res.status(200).json(posts);
    }

    catch (ex){
        console.log(ex);
    }
}

module.exports = {getPosts, createPost};
