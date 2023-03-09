const mongoose = require("mongoose");

const postSchema = new mongoose.Schema( {
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: String
}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);
