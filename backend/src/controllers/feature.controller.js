import { asyncHandler } from "../utils/asyncHandler.js";
import { generateStory } from "../utils/GeminiAi.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { createFolder, uploadFileToFolder } from "../utils/Gdrive.js";
import path from "path";

const sendBirthdayWish = asyncHandler(async (req, res) => {
    const { name, relation, type } = req.body;
    try {
        const responseText = await generateStory(name, relation, type);
        res.json(
            new ApiResponse(200, responseText, `Wish for ${name} generated successfully!`)
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating wish");
    }
})

const getDriveFile = asyncHandler(async (req, res) => {
    
    // const response = await createFolder(req.user.username);
    const response = await uploadFileToFolder(
        "1XN16Z2Q6-L0Ru6AfSnduHtfQ9gpkZlz8", // Folder ID
        path.join("public","1728018229445-507008342.png"), // File path
        "image/png" // MIME type for PNG images
    );

    console.log("1", response) //1RBqsp-9_M2dVZUrarjdqsTM-oWGoAAPx
})

export {
    sendBirthdayWish,
    getDriveFile
}


// Common MIME Types
// Here are some common MIME types:

// Text Files: text/plain
// HTML Files: text/html
// JPEG Images: image/jpeg
// PNG Images: image/png
// GIF Images: image/gif
// PDF Files: application/pdf
// Microsoft Word Documents: application/msword or application/vnd.openxmlformats-officedocument.wordprocessingml.document (for .docx)