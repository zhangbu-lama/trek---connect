import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Trek } from "../../models/index.js";

export const getTrekById = asyncHandler(async (req, res) => {
    const trekId = req.params?.id;

    if (!isValidObjectId(trekId)) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6000, "invalid trek id"));
    }

    const trek = await Trek.findById(trekId);

    if (!trek) {
        return res
            .status(404)
            .json(new ErrorResponse(404, 6001, "trek not found"));
    }

    return res
        .status(200)
        .json(new SuccessResponse(200, "trek fetched succesfully", trek));
});
