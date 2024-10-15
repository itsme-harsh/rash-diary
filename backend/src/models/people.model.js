import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    default: null
  },
  relationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Relation',
    required: true
  },
  dob: {
    type: Date,
    required: false, // Optional field
    default: null
  },
  reminder: {
    type: Boolean,
    default: true // Default value
  },
  status: {
    type: Boolean,
    required: false, // Optional field
    default: null
  },
  type: {
    type: String,
    required: false, // Optional field
    default: null
  },
  city: {
    type: String,
    required: false, // Optional field
    default: null
  }
}, { timestamps: true });

// Unique compound index on relationId and name
peopleSchema.index({ relationId: 1, name: 1 }, { unique: true });

export const People = mongoose.model('People', peopleSchema);
