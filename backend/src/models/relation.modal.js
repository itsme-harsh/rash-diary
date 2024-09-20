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

// Unique compound index on userId and name
// relationSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Relation = mongoose.model("Relation", relationSchema);
