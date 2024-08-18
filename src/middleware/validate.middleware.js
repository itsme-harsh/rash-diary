import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const validate = (schema) => asyncHandler(async (req, res, next) => {
    
    try {
        if(req.file){
            req.body.image = req.file.filename
        }
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        console.error(error)
        const errorMessage = error.details.map(d => d.message).join(', ');
        throw new ApiError(400, errorMessage);
    }
});

export default validate;
