import { DataTypes, CreationOptional, Optional } from 'sequelize';
import { Model } from "sequelize-typescript";
import db from "../instances/sequelize";

export interface UserAttributes {
    id?: string | null,
    name: string,
    email: string,
    password: string,
    is_admin: boolean
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes> {
    id: CreationOptional<string>;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
}

export const UserModel = db.define<UserInstance>('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
  