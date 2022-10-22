import { DataTypes } from "sequelize";
import SequalizeInstance from "./index.js";

const Todo = SequalizeInstance.define("todos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
});

export default Todo;