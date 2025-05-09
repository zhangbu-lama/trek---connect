import { asyncHandler, SuccessResponse } from "../../lib/index.js";

export const logout = asyncHandler(async (_, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    return res
        .clearCookie("access_token", cookieOptions)
        .clearCookie("refresh_token", cookieOptions)
        .status(200)
        .json(new SuccessResponse(200, "logout successful", {}));
});
