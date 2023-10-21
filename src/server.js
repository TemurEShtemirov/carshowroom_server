import express from "express";
import pkg from "pg";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const { Pool } = pkg;
const app = express();
const PORT = 8080;

const pool = new Pool({
  connectionString: "postgres://postgres:1015@localhost:5432/carshowroom",
});

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, uploadDir);
    });
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".png") {
    return cb(new Error("Only JPG and PNG images are allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

app.get("/cars", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    const cars = result.rows;
    res.json({ cars });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/cars", upload.single("image"), async (req, res) => {
  const { name, description, engine, type, year } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      "INSERT INTO cars (name, description, engine, type, year, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, engine, type, year, image]
    );
    const newCar = result.rows[0];
    res.status(201).json({ message: "Car created successfully", car: newCar });
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cars/:id", async (req, res) => {
  const carId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM cars WHERE id = $1", [
      carId,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    const car = result.rows[0];
    res.json({ message: "Car retrieved successfully", car });
  } catch (error) {
    console.error("Error retrieving car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/cars/:id", upload.single("image"), async (req, res) => {
  const carId = req.params.id;
  const { name, description, engine, type, year } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      "UPDATE cars SET name = $1, description = $2, engine = $3, type = $4, year = $5, image = $6 WHERE id = $7 RETURNING *",
      [name, description, engine, type, year, image, carId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car updated successfully", car: result.rows[0] });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/cars/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM cars WHERE id = $1 RETURNING *",
      [carId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully", car: result.rows[0] });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
