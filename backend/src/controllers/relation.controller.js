import { Relation } from "../models/relation.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getRelations = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    //optional
    if (!userId) {
        throw new ApiError(400, "Please login again")
    }

    const relations = await Relation.find({ userId: userId }).select("-__v -userId")

    if (relations.length === 0) {
        res.json(
            new ApiResponse(200, relations, "No Relations Exists.")
        )
    } else {
        res.json(
            new ApiResponse(200, relations, "All relations fetched successfully.")
        )
    }

})

const registerRelation = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { name } = req.body;

    const isExistRelation = await Relation.findOne({ name: name, userId: userId });

    if (isExistRelation) {
        throw new ApiError(409, "Relation is already exists")
    }

    const savedRelation = await Relation.create({ ...req.body, userId: userId })

    const checkRelation = await Relation.findById(savedRelation._id).select(" -userId -__v")

    if (!checkRelation) {
        throw new ApiError(500, "Something went wrong while creating relation")
    }

    res.status(201).json(
        new ApiResponse(201, checkRelation, "Relation is created")
    )

})

const updateRelation = asyncHandler(async (req, res) => {
    const relationId = req.params.relationId;

    // Extract the updated name from the request body
    const { name } = req.body;

    // Check if the relation exists before attempting to update it
    const existingRelation = await Relation.findOne({ 
        name: name,
        _id: { $ne: relationId } // Ensure we're not matching the current relation being updated
    });

    if (existingRelation) {
        throw new ApiError(400, "Relation name already exists");
    }

    // Perform the update
    const updatedRelation = await Relation.findByIdAndUpdate(relationId, req.body, {
        new: true,
        runValidators: true, // Validate before update
    });

    // If no document was found, updatedRelation will be null
    if (!updatedRelation) {
        throw new ApiError(404, "Relation doesn't exist");
    }

    // Respond with the updated relation
    res.status(200).json(
        new ApiResponse(200, updatedRelation, "Relation updated successfully")
    );
});


const deleteRelation = asyncHandler(async (req, res) => {
    const { relationId } = req.params; // Get relationId from URL parameter

    if (!relationId) {
        throw new ApiError(400, "Invalid relation id");
    }

    const isExistRelation = await Relation.findById(relationId);

    if (!isExistRelation) {
        throw new ApiError(400, "No relation exists");
    }

    // This will trigger the pre('remove') middleware to delete related people
    await Relation.findByIdAndDelete(relationId);

    res.status(200).json(
        new ApiResponse(200, {}, "Relation and associated people deleted successfully")
    );
});



export {
    getRelations,
    registerRelation,
    updateRelation,
    deleteRelation
};
