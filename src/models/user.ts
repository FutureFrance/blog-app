import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import { Model } from "sequelize-typescript";
import db from "../instances/sequelize";

export interface UserAttributes {
    id?: number | null,
    name: string,
    email: string,
    password: string,
    is_admin?: boolean
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
}

export const UserModel = db.define<UserInstance>('user', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
  