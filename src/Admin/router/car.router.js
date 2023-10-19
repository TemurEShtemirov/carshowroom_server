import { Router } from "express";
import {
  GetAllCars,
  GetCarById,
  CreateCar,
  UpdateCar,
  DeleteALlCars,
  DeleteCarById,
} from "../controller/car.contoroller.js";

const carRouter = Router();

carRouter.get("/cars", GetAllCars);
carRouter.get("/cars/:id", GetCarById);
carRouter.post("/cars", CreateCar);
carRouter.put("/cars/:id", UpdateCar);
carRouter.delete("/cars", DeleteALlCars);
carRouter.delete("/cars/:id", DeleteCarById);

export default carRouter;
