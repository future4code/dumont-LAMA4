import express from "express";
import { ShowsController } from "../ShowsController";

export const showsRouter = express.Router();

const showsController = new ShowsController()

showsRouter.post("/create", showsController.createShow)

