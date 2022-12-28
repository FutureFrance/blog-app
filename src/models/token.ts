import { DataTypes, CreationOptional, Optional } from 'sequelize';
import { Model } from "sequelize-typescript";
import db from "../instances/sequelize";

export interface TokenAttributes {
    id?: string | null,
    token: string,
    user: string
}

interface TokenCreationAttributes
  extends Optional<TokenAttributes, 'id'> {}

export interface TokenInstance extends Model<TokenAttributes, TokenCreationAttributes> {
    id: CreationOptional<string>;
    token: string;
    user: string;
}

export const TokenModel = db.define<TokenInstance>('token', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
