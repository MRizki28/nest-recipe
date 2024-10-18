import { Injectable, InternalServerErrorException, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeDto } from 'src/dto/recipe/recipe.dto';
import { RecipeModel } from 'src/models/recipe.model';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { UserModel } from 'src/models/user.model';


export interface User {
    userId: string;
}

@Injectable()
export class RecipeService {
    constructor(
        @InjectModel(RecipeModel)
        private readonly recipeModel: typeof RecipeModel,

        @InjectModel(UserModel)
        private readonly userModel: typeof UserModel,
    ) { }

    async getAllData(): Promise<any> {
        const data = await this.recipeModel.findAll();
        if (data) {
            return data;
        }

        return {
            message: 'Data not found'
        }
    }

    async createData(req: Request & { user: User }, recipeDto: RecipeDto, img_recipe: Express.Multer.File): Promise<any> {
        try {
            const id_user = req.user.userId;
            const { name_recipe, description, category, difficulty, prep_time, cook_time, serving } = recipeDto;
            const recipe = new this.recipeModel();

            const userExists = await this.userModel.findOne({ where: { id: id_user } });
            if (!userExists) {
                throw new NotFoundException({
                    status: 'not found',
                    message: 'User not found please login again',
                });
            }

            recipe.user_id = id_user;
            recipe.name_recipe = name_recipe;
            recipe.description = description;
            recipe.category = category;
            recipe.difficulty = difficulty;
            recipe.prep_time = prep_time;
            recipe.cook_time = cook_time;
            recipe.serving = serving;

            const filename = `${uuidv4()}-${img_recipe.originalname}`;
            const path = `./public/uploads/recipe/${filename}`;
            const writeStream = createWriteStream(path);

            const fileUploadPromise = new Promise((resolve, reject) => {
                writeStream.on('finish', () => resolve(true));
                writeStream.on('error', (err) => reject(err));
                writeStream.write(img_recipe.buffer);
                writeStream.end();
            });

            await fileUploadPromise;
            recipe.img_recipe = filename;

            await recipe.save();
            return {
                message: 'Data created successfully',
                data: recipe
            };

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while creating the recipe');
        }
    }
}
