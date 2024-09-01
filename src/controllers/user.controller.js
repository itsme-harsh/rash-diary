import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendRegistrationEmail } from "../utils/sendEmail.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateRefreshToken()
        const refreshToken = user.generateAccessToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if (existedUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -role"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user");
    }
    
    sendRegistrationEmail(createdUser.email,"register", createdUser.username);

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -role");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

export {
    loginUser,
    logoutUser,
    registerUser
};

