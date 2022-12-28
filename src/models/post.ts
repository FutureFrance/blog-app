import { DataTypes, CreationOptional, Optional } from 'sequelize';
import { Model } from "sequelize-typescript";
import db from "../instances/sequelize";

export interface PostAttributes {
    id?: string | null,
    title: string,
    content: string,
    published: boolean,
    owner: string
}

interface PostCreationAttributes
  extends Optional<PostAttributes, 'id'> {}

export interface PostInstance extends Model<PostAttributes, PostCreationAttributes> {
    id: CreationOptional<string>;
    title: string;
    content: string;
    published: boolean;
    owner: string;
}

export const PostModel = db.define<PostInstance>('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    owner: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

  