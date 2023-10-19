import { Model } from "sequelize";

export const Car = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Car.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      engine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.STRING,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Car",
      timestamps: true,
      underscored: true,
      tableName: "cars",
    }
  );

  return Car;
};
