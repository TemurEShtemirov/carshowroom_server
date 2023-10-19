import { Car } from "../model/car.model.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/Admin/  upload");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("images");

export const GetAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json({ data: cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByPk(carId);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateCar = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload images" });
        return;
      }
      const { name, description, engine, type, price } = req.body;
      const imagePaths = req.file ? [req.file.path] : [];
      const car = await Car.create({
        name,
        description,
        engine,
        type,
        price,
        images: imagePaths,
      });
      res.status(201).json(car);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateCar = async (req, res) => {
  try {
    const { name, description, engine, type, price } = req.body;
    const carId = req.params.id;
    const updatedCar = await Car.findByPk(carId);
    if (!updatedCar) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    updatedCar.name = name;
    updatedCar.description = description;
    updatedCar.engine = engine;
    updatedCar.type = type;
    updatedCar.price = price;
    await updatedCar.save();
    res.status(202).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteALlCars = async (req, res) => {
  try {
    await Car.destroy({ truncate: true });
    res.status(204).json({ message: "All cars deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByPk(carId);
    if (!deletedCar) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    await deletedCar.destroy();
    res.status(204).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
