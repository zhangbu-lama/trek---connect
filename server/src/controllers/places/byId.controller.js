import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Place } from "../../models/place.model.js";
export const getPlaceById = asyncHandler(async (req, res) => {
    const placeId = req.params.id;

    if (!isValidObjectId(placeId)) {
        throw new ErrorResponse(400, 6000, "invalid place id");
    }

    const place = await Place.findById(placeId).populate("category");

    if (!place) {
        throw new ErrorResponse(404, 6004, "place not found");
    }

    return res
        .status(200)
        .json(new SuccessResponse(200, "place fetched", place));
});
