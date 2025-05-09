import express from "express";

import {
    addTrek,
    getAllTreks,
    getTrekById,
    deleteTrek,
    getTreksByPlaceId,
    updateTrek,
} from "../controllers/index.js";
import { upload } from "../middlewares/index.js";

export const treksRouter = express.Router();

treksRouter.get("/all", getAllTreks);
treksRouter.post("/add", upload.array("images"), addTrek);
treksRouter.get("/:id", getTrekById);
treksRouter.get("/place/:id", getTreksByPlaceId);
treksRouter.put("/update/:id", upload.array("images"), updateTrek);
treksRouter.delete("/delete/:id", deleteTrek);
