import mongoose, { Schema } from "mongoose";
import { People } from "./people.model.js";

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

relationSchema.pre('findOneAndDelete', async function (next) {
  try {
    // Retrieve the relation that is about to be deleted
    const relation = await this.model.findOne(this.getFilter());

    if (relation) {
      // Delete all People associated with this Relation
      await People.deleteMany({ relationId: relation._id });
    }

    next();
  } catch (error) {
    next(error);
  }
});


export const Relation = mongoose.model("Relation", relationSchema);
