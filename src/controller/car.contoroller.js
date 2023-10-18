import Car from "../model/car.model.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + this.filename);
  },
});

const upload = multer({ storage: storage }).single("images");

export async function GetAllCars(req, res) {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function GetCarById(req, res) {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function PostCar(req, res) {
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
}

export async function UpdateCarById(req, res) {
  try {
    const { name, description, engine, type, price } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { name, description, engine, type, price },
      { new: true }
    );
    if (!updatedCar) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function DeleteAllCars(req, res) {
  try {
    await Car.deleteMany();
    res.status(200).json({ message: "All cars deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function DeleteCarById(req, res) {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
