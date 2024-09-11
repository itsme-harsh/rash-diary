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

    const checkRelation = await Relation.findById(savedRelation._id).select("-_id -userId -__v")

    if (!checkRelation) {
        throw new ApiError(500, "Something went wrong while creating relation")
    }

    res.status(201).json(
        new ApiResponse(201, checkRelation, "Relation is created")
    )

})

export {
    getRelations,
    registerRelation
};
