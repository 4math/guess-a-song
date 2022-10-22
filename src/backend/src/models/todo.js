import { DataTypes } from "sequelize";
import SequalizeInstance from ".";

export const Todo = SequalizeInstance.define("todos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: true
  },
  published: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
