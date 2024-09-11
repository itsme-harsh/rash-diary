import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  relationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Relation', 
    required: true 
  },
  dob: { 
    type: Date, 
    required: false // Optional field
  },
  reminder: { 
    type: Boolean, 
    default: true // Default value
  },
  status: { 
    type: String, 
    required: false // Optional field
  },
  type: { 
    type: String, 
    required: false // Optional field
  },
  city: { 
    type: String, 
    required: false // Optional field
  }
}, { timestamps: true });

export const People = mongoose.model('People', peopleSchema);
