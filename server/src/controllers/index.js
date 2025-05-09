import { verifyAdminToken } from "./admin/verifyAdminToken.controller.js";
import { userLogin } from "./auth/login.controller.js";
import { logout } from "./auth/logout.controller.js";
import { signup } from "./auth/signup.controller.js";
import { verifyUserToken } from "./auth/verifyUserToken.controller.js";
import { getBookingById } from "./booking/byId.controller.js";
import { createBooking } from "./booking/create.controller.js";
import { getAllBookings } from "./booking/getAll.controller.js";
import { getBookingByUserId } from "./booking/getBookingsByUserId.controller.js";

import { addCategory } from "./categories/add.controller.js";
import { getAllCategories } from "./categories/all.controller.js";
import { getCategorieById } from "./categories/byId.controller.js";
import { deleteCategory } from "./categories/delete.controller.js";
import { updateCategory } from "./categories/update.controller.js";

import { addPlace } from "./places/add.controller.js";
import { getAllPlaces } from "./places/all.controller.js";
import { getPlaceById } from "./places/byId.controller.js";
import { deletePlace } from "./places/delete.controller.js";
import { updatePlace } from "./places/update.controller.js";

import { addTrek } from "./treks/add.controller.js";
import { getAllTreks } from "./treks/all.controller.js";
import { getTrekById } from "./treks/byId.controller.js";
import { deleteTrek } from "./treks/delete.controller.js";
import { getTreksByPlaceId } from "./treks/getByPlace.controller.js";
import { updateTrek } from "./treks/update.controller.js";

export {
    signup,
    userLogin,
    addTrek,
    getAllTreks,
    getTrekById,
    deleteTrek,
    getTreksByPlaceId,
    updateTrek,
    getPlaceById,
    addPlace,
    getAllPlaces,
    deletePlace,
    updatePlace,
    addCategory,
    getAllCategories,
    getCategorieById,
    deleteCategory,
    updateCategory,
    verifyUserToken,
    verifyAdminToken,
    logout,
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingByUserId,
};
