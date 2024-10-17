import { IsEnum, IsNotEmpty } from "class-validator";
import { Category, Difficulty } from "src/config/enum/recipe.enum";

export class RecipeDto {
    @IsNotEmpty()
    name_recipe: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    @IsNotEmpty()
    @IsEnum(Category, { message: 'category must be one of the following values: breakfast, dinner' })  // Pesan custom
    category: Category;

    @IsNotEmpty()
    @IsEnum(Difficulty, { message: 'difficulty must be one of the following values: easy, medium, hard' })  // Pesan custom
    difficulty: Difficulty;

    @IsNotEmpty()
    prep_time: number;
    @IsNotEmpty()
    cook_time: number;
    @IsNotEmpty()
    serving: number;


    img_recipe: Express.Multer.File;
}