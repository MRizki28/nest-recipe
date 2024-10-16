import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeController } from 'src/controllers/recipe/recipe.controller';
import { RecipeModel } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe/recipe.service';

@Module({
    imports: [SequelizeModule.forFeature([RecipeModel])],
    providers: [RecipeService],
    controllers: [RecipeController],
})
export class RecipeModule {}
