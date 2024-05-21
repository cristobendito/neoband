import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({

    emisor :{
        type: String,
        required: true,

    },

    receptor :{
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