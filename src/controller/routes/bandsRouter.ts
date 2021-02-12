import express from "express";
import { BandsController } from "../BandsController"


export const bandsRouter = express.Router();

const bandsController = new BandsController();

bandsRouter.post("/create", bandsController.createBands)
bandsRouter.get("/:id", bandsController.getBandById)
