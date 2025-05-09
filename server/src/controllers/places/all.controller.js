import { asyncHandler, SuccessResponse } from "../../lib/index.js";
import { Place } from "../../models/place.model.js";
export const getAllPlaces = asyncHandler(async (_, res) => {
    const places = await Place.find().populate("category");

    return res
        .status(200)
        .json(new SuccessResponse(200, "all places fetched", places));
});
