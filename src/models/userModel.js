import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true

    },
    username :{
        type: String,
        required: true,
        unique: true

    },
    password :{
        type: String,
        required: true,
    },
    role :{
        type: String,
        enum: ["user","band"],
        default: "user"

    },
    bio :{ 
    type: String,
    profilePicture: String,
    },

})


const userModel = mongoose.model ("user",userSchema);
export default userModel;