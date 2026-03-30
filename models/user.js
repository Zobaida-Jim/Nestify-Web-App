const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    }
    //passportLocalMongoose create username and hashed passport by default, so we do not need to define them
});

userSchema.plugin(passportLocalMongoose);//Implement username, hashing, salting, passowrd automatically
module.exports = mongoose.model("User", userSchema);