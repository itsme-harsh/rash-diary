import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendRegistrationEmail } from "../utils/sendEmail.js";
import { generateOtp } from "../utils/generateOtp.js"
import { UserActivity } from "../models/logger.model.js";

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
        if (existedUser.verified) {
            throw new ApiError(409, "User with this email or username already exists");
        } else {
            throw new ApiError(400, "Please verify your account");
        }
    }

    const otpToken = generateOtp();

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        otp: otpToken.otp,
        expiresAt: otpToken.expiresAt
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -role -otp -expiresAt"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user");
    }

    sendRegistrationEmail(createdUser.email, otpToken.otp);

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
        throw new ApiError(404, "Invalid user credentials");
    }


    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    if (!user.verified) {
        // throw new ApiError(400, "Please verify your account")
        return res.status(400).json(new ApiResponse(400, {}, "Please verify your account"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -role -otp -expiresAt");

    const options = {
        httpOnly: true,
        secure: true
    }

    await UserActivity.create({
        userId: user._id,
        action: "User Logged in successfully",
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    })


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

    await UserActivity.create({
        userId: req.user._id,
        action: "User Logged out successfully",
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    })

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

const verifyOTP = asyncHandler(async (req, res) => {

    const { email, username, otp } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] }).select("-password -__v -role -refreshToken")

    if (!user) { throw new ApiError(400, "Invalid request") }

    if (user?.verified) {
        throw new ApiError(400, "Invalid request")
    }

    if (user.expiresAt < Date.now()) {
        throw new ApiError(400, "Your OTP has expired");
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Wrong OTP number !!")
    }

    user.verified = true;
    user.otp = null;
    user.expiresAt = null

    const savedUser = await user.save();

    res.json(
        new ApiResponse(200, savedUser, "User verified successfully")
    )
})

const resendOTP = asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });


    if (!user) { throw new ApiError(400, "Invalid request") }

    if (user.verified) {
        throw new ApiError(400, "Invalid request")
    }

    const otpToken = generateOtp();

    user.otp = otpToken.otp;
    user.expiresAt = otpToken.expiresAt;
    await user.save();

    sendRegistrationEmail(user.email, otpToken.otp);

    res.json(
        new ApiResponse(200, [], "OTP sent successfully")
    )
})

const getLogs = asyncHandler(async (req, res) => {

    // console.log(req.body)
    const { id } = req.body;

    if (!id) {
        throw new ApiError(400, "Invalid request")
    }

    const userActivity = await UserActivity.find({userId: id}).sort({ timestamp: -1 });

    if(!userActivity){
        throw new ApiError(400, "Invalid request")
    }else{
        res.json(
            new ApiResponse(200, userActivity, "User activity sent successfully")
        )
    }

})

export {
    loginUser,
    logoutUser,
    registerUser,
    verifyOTP,
    resendOTP,
    getLogs
};

