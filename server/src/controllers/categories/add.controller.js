import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Categorie } from "../../models/category.model.js";

export const addCategory = asyncHandler(async (req, res) => {
    const name = req.body?.name ?? "";
    const description = req.body?.description ?? "";
    const image = req.file ?? null;

    if (!name) {
        throw new ErrorResponse(400, 6000, "name is required");
    }

    if (!description) {
        throw new ErrorResponse(400, 6000, "description is required");
    }

    if (!image) {
        throw new ErrorResponse(400, 6000, "image is required");
    }

    const category = await Categorie.create({
        name,
        description,
        image:image.filename,
    });
    console.log(category);

    return res.status(200).json(
        new SuccessResponse(200, "category added", {
            ...category,
        }),
    );
});
