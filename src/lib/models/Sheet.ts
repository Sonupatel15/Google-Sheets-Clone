import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../db";

interface SheetAttributes {
  id: string;
  name: string;
  data: Record<string, any>; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

class Sheet extends Model<
  InferAttributes<Sheet>, 
  InferCreationAttributes<Sheet>
> implements SheetAttributes {
  public id!: string;
  public name!: string;
  public data!: Record<string, any>;
  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Sheet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    data: {
      type: DataTypes.JSONB, 
      allowNull: false,
      defaultValue: {},
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Sheet",
    timestamps: true, 
  }
);

export default Sheet;
