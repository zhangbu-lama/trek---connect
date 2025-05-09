import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Categorie } from "../../models/category.model.js";
export const deleteCategory = asyncHandler(async (req, res) => {
    const catId = req.params.id;

    if (!isValidObjectId(catId)) {
        throw new ErrorResponse(400, 6000, "invalid id");
    }

    const deleted = await Categorie.deleteOne({ _id: catId });

    return res
        .status(200)
        .json(new SuccessResponse(200, "category deleted", deleted));
});
