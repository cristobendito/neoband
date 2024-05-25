import mongoose from "mongoose";

const bandSchema = new mongoose.Schema({
    
    bandname :{
        type: String,
        required: true,
        unique: true

    },
    email :{
        type: String,
        required: true,
        unique: true

    },
    password :{
        type: String,
        required: true,
    },
    bio : String,
    
    profilePicture :{
        type: String,
        required: true,
    },

})


const bandModel = mongoose.model ("band",bandSchema);
export default bandModel;