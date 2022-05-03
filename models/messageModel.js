import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({


    fullNames: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true 
    },
    text: {
        type: String,
        required: true
    },
    dateOfMessage: {
        type: Date,
        required: true,
        default: Date.now
    }
})


const Message = model('Message', messageSchema);

export default Message;