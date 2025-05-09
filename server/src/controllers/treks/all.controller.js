import { asyncHandler, SuccessResponse } from "../../lib/index.js";
import { Trek } from "../../models/index.js";

export const getAllTreks = asyncHandler(async (_, res) => {
    const treks = await Trek.find().populate("place");

    return res
        .status(200)
        .json(new SuccessResponse(200, "fetched all treks succesfully", treks));
});
