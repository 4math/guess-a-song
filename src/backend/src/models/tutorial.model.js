import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorials", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Tutorial;
};