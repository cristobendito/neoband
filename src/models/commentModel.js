import mongoose from 'mongoose';



const commentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    band: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Band', 
        required: true },
    content: { 
        type: String, 
        required: true },
    createdAt: { 
        type: Date, 
        default: Date.now },

});

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
