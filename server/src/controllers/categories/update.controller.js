import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Categorie } from "../../models/category.model.js";
export const updateCategory = asyncHandler(async (req, res) => {
    const catId = req.params.id;
    const name = req.body?.name ?? "";
    const description = req.body?.description ?? "";
    const image = req?.file;

    if (!isValidObjectId(catId)) {
        throw new ErrorResponse(400, 6000, "invalid category id");
    }

    if (!name) {
        throw new ErrorResponse(400, 6000, "updated name is required");
    }

    if (!description) {
        throw new ErrorResponse(400, 6000, "updated description is required");
    }

    const category = await Categorie.findById(catId);

    category.name = name;
    category.description = description;
    category.image = image ? image.filename : category.image;

    await category.save();

    return res
        .status(200)
        .json(new SuccessResponse(200, "category updated", category));
});
