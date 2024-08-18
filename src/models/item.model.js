import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    birthdate: {
        type: Date,
    },
    i_id: {
        type: String,
        trim: true
    },
    number: {
        type: Number,
    },
    city: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active'  
    },
    rel: {
        type: String,
        enum: ['ok1', 'ok2', 'ok3'],
        default: 'ok1'  
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true  
});


export const Item = mongoose.model('Item', itemSchema);


