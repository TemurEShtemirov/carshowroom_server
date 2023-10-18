import { Router } from "express";
import {
  DeleteAllCars,
  DeleteCarById,
  GetAllCars,
  GetCarById,
  PostCar,
  UpdateCarById,
} from "../controller/car.contoroller.js";

const carRouter = Router();

carRouter.get("/cars", GetAllCars);
carRouter.get("/car:id", GetCarById);
carRouter.post("/car", PostCar);
carRouter.put("/car:id", UpdateCarById);
carRouter.delete("/cars", DeleteAllCars);
carRouter.delete("/car:id", DeleteCarById);

export default carRouter