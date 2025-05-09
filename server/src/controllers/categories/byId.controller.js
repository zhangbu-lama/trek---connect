import mongoose from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Categorie } from "../../models/category.model.js";

export const getCategorieById = asyncHandler(async (req, res) => {
    const catId = req.params.id;

    if (!mongoose.isValidObjectId(catId)) {
        throw new ErrorResponse(400, 6000, "invalid id");
    }

    const category = await Categorie.findById(catId);

    if (!category) {
        throw new ErrorResponse(404, 6004, "category not found");
    }

    return res.status(200).json(
        new SuccessResponse(200, "desired action done succesfully", {
            ...category,
        }),
    );
});
