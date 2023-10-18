const Car = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
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
        type: DataTypes.NUMBER,
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
      timestamps: false, 
      underscored: true,
      tableName: "cars", 
    }
  );

  return Car;
};

export default Car;
