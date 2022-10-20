import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";

export class Tutorial extends Model<
  InferAttributes<Tutorial>,
  InferCreationAttributes<Tutorial>
> {
  declare id: number;
  declare title: string;
  declare description: string;
  declare published: boolean;
}

Tutorial.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: false,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    published: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "tutorials",
  }
);
