import {
    asyncHandler,
    SuccessResponse,
    ErrorResponse,
} from "../../lib/index.js";
import { Place } from "../../models/place.model.js";
export const addPlace = asyncHandler(async (req, res) => {
    console.log(req.body);
    const name = req.body?.name;
    const location = req.body?.location;
    const description = req.body?.description;
    const category = req.body?.category;
    const relatedName = req.body?.related_name;
    const image = req.file;
    const timeToTravel = req.body?.time_to_travel;

    if (!name) {
        throw new ErrorResponse(400, 6000, "name is required");
    }

    if (!location) {
        throw new ErrorResponse(400, 6000, "location is required");
    }
    if (!description) {
        throw new ErrorResponse(400, 6000, "description is required");
    }
    if (!category) {
        throw new ErrorResponse(400, 6000, "category is required");
    }
    if (!relatedName) {
        throw new ErrorResponse(400, 6000, "related_name is required");
    }
    if (!image) {
        throw new ErrorResponse(400, 6000, "image is required");
    }
    if (!timeToTravel) {
        throw new ErrorResponse(400, 6000, "time_to_travel is required");
    }
    if (!image) {
        throw new ErrorResponse(400, 6000, "image is required");
    }

    const place = await Place.create({
        name,
        location,
        description,
        category,
        related_name: relatedName,
        image: image.filename,
        time_to_travel: timeToTravel,
    });

    return res
        .status(200)
        .json(new SuccessResponse(200, "place created", place));
});
