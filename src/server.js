import express from "express";
import sequelize from "./db/db.js";
import carRouter from "./Admin/router/car.router.js";
import cors from "cors";

async function bootstrap() {
  const app = express();
  const port = 8585;

  app.use(carRouter);
  app.use(express.json());
  app.use(cors());
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(port, () => {
    try {
      console.log(`Server is running on port :${port}`);
    } catch (error) {
      console.log(`SERVER ERROR: ${error}`);
    }
  });
}

bootstrap();
