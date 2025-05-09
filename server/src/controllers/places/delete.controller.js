import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Place } from "../../models/place.model.js";
export const deletePlace = asyncHandler(async (req, res) => {
    const placeId = req.params.id;

    if (!isValidObjectId(placeId)) {
        throw new ErrorResponse(400, 6000, "invalid id");
    }

    const deleted = await Place.deleteOne({ _id: placeId });

    return res
        .status(200)
        .json(new SuccessResponse(200, "place deleted", deleted));
});
