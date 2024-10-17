import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeController } from 'src/controllers/recipe/recipe.controller';
import { RecipeModel } from 'src/models/recipe.model';
import { UserModel } from 'src/models/user.model';
import { RecipeService } from 'src/service/recipe/recipe.service';

@Module({
    imports: [SequelizeModule.forFeature([RecipeModel, UserModel])],
    providers: [RecipeService],
    controllers: [RecipeController],
})
export class RecipeModule {}
