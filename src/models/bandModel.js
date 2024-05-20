import mongoose from "mongoose";

const bandSchema = new mongoose.Schema({
    
    bandname :{
        type: String,
        required: true,
        unique: true

    },
    bio :{
        type: String,
        required: true,
        unique: true

    },
    profilePicture :{
        type: String,
        required: true,
        unique: true

    },

})


const bandModel = mongoose.model ("band",bandSchema);
export default bandModel;