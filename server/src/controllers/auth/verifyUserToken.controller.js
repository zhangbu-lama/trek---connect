import {
    asyncHandler,
    SuccessResponse,
    ErrorResponse,
} from "../../lib/index.js";

export const verifyUserToken = asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user) {
        return res
            .status(401)
            .json(new ErrorResponse(401, 7004, "Unauthorized"));
    }
    return res
        .status(200)
        .json(new SuccessResponse(200, "User token verified", user));
});
