import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname)
        cb(null, `${uniqueSuffix}${extension}`)
    }
})

// Allowed image MIME types
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

// Helper function for validating image files
const FileFilter = (req, file, cb) => {
    if (imageMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

export const upload = multer({
    fileFilter: FileFilter,
    storage,
})