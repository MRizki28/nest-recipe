import { Injectable } from "@nestjs/common";
import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table({
    tableName: 'recipe',
})

@Injectable()
export class RecipeModel extends Model<RecipeModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id: string

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user_id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name_recipe: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string

    @Column({
        type: DataType.ENUM('breakfast', 'dinner'),
        allowNull: false,
    })
    category: string

    @Column({
        type: DataType.ENUM('easy', 'medium', 'hard'),
        allowNull: false,
    })
    difficulty: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    prep_time: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })

    cook_time: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    serving: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    img_recipe: string

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}