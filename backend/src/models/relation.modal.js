import mongoose, { Schema } from "mongoose";

const relationSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: ''
  },
  birthdayReminder: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true }); 

export const Relation = mongoose.model("Relation", relationSchema);
