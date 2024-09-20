import { Relation } from "../models/relation.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { People } from "../models/people.model.js";
import mongoose from "mongoose";

const getPeople = asyncHandler(async (req, res) => {
    
    const { relationId } = req.params;

    const relation = await Relation.findById(relationId);
    if (!relation) {
        throw new ApiError(404, "Relation not found");
    }

    // Find all people associated with the relationId
    const people = await People.find({ relationId });

    if (people.length === 0) {
        res.json(
            new ApiResponse(200, people, "No People Exists")
        );
    } else {
        res.json(
            new ApiResponse(200, people, "People retrieved successfully.")
        )
    }
})

const getAllPeople = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Ensure this is correctly set from authentication middleware

    if (!userId) {
        throw new ApiError(400, "Invalid request");
    }

    try {
        // Aggregation pipeline
        const people = await Relation.aggregate([
            // Step 1: Match relations for the specified userId
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            // Step 2: Lookup to join with the people collection based on relationId
            {
                $lookup: {
                    from: 'peoples', // Collection name for people
                    localField: '_id', // Field from Relation
                    foreignField: 'relationId', // Field from People
                    as: 'people' // Output array of matched people
                }
            },
            // Step 3: Optionally unwind the people array if you need to work with individual documents
            { $unwind: { path: '$people', preserveNullAndEmptyArrays: true } },
            // Step 4: Group by relationId to aggregate people under each relation
            {
                $group: {
                    _id: '$_id',
                    relationId: { $first: '$_id' },
                    relationName: { $first: '$name' },
                    people: { $push: '$people' }
                }
            },
            // Optionally, project desired fields
            {
                $project: {
                    _id: 0,
                    relationId: 1,
                    relationName: 1,
                    people: {
                        _id: 1,
                        name: 1,
                        dob: 1,
                        reminder: 1,
                        status: 1,
                        type: 1,
                        city: 1
                    }
                }
            }
        ]);

        if (people.length === 0) {
            return res.json(new ApiResponse(200, people, "No people found."));
        }

        return res.json(new ApiResponse(200, people, "People retrieved successfully."));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Server error");
    }
});

const registerPeople = asyncHandler(async (req, res) => {
    const { relationId, name } = req.body;

    // Check if the relation exists
    const relation = await Relation.findById(relationId);
    if (!relation) {
        throw new ApiError(404, "Relation not found.");
    }

    const existingPerson = await People.findOne({ relationId, name });

    if (existingPerson) {
        throw new ApiError(409, "Person with the same name already exists in this relation.");
    }

    const newPeople = await People.create(req.body)

    const createdPeople = await People.findById(newPeople._id).select("-__v")

    if (!createdPeople) {
        throw new ApiError(500, "Something went wrong while creating the people");
    }

    res.json(
        new ApiResponse(200, createdPeople, "People created successfully")
    )

})

const updatePeople = asyncHandler(async (req, res) => {

})

const deletePeople = asyncHandler(async (req, res) => {
    const { peopleId, relationId } = req.body;

    // Check if the person exists with the given peopleId and relationId
    const isExist = await People.findOne({ _id: peopleId, relationId: relationId });
    if (!isExist) {
        throw new ApiError(404, "Person not found.");
    }

    // Delete the person
    const response = await People.deleteOne({ _id: peopleId, relationId: relationId });

    res.status(200).json({
        success: true,
        message: "Person deleted successfully."
    });
})

export {
    getPeople,
    registerPeople,
    updatePeople,
    deletePeople,
    getAllPeople
}