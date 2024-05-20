import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    id_msg :{
        type: String,
        required: true,
        unique: true

    },
    send :{
        type: String,
        required: true,
        unique: true

    },
    receive :{
        type: String,
        required: true,
    },
    content :{
        type: String,
        required: true,
    },
})


const msgModel = mongoose.model ("msg",msgSchema);
export default msgModel;