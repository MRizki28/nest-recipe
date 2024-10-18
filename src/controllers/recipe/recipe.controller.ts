import { Body, Controller, Delete, Get, Param, Post, Req, UnprocessableEntityException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/config/jwt/jwtAuth.guard';
import { RecipeDto } from 'src/dto/recipe/recipe.dto';
import { RecipeService } from 'src/service/recipe/recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @UseInterceptors(FileInterceptor('img_recipe'))
    async createData(@Req() req, @Body() recipeDto: RecipeDto,@UploadedFile() img_recipe: Express.Multer.File): Promise<any> {
        if(!img_recipe) {
            throw new UnprocessableEntityException({
                status: 'not validate',
                message: [
                    {
                        field: 'img_recipe',
                        error: 'Image Recipe is required',
                    },
                ],
            });
        }
        return await this.recipeService.createData(req, recipeDto, img_recipe);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/:id')
    async getDataById(@Param('id') id: string): Promise<any> {
        return await this.recipeService.getDataById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update/:id')
    @UseInterceptors(FileInterceptor('img_recipe'))
    async updateData(@Param('id') id: string, @Body() recipeDto: RecipeDto, @UploadedFile() img_recipe: Express.Multer.File): Promise<any> {
        return await this.recipeService.updateData(id, recipeDto, img_recipe);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async deleteData(@Param('id') id: string): Promise<any> {
        return await this.recipeService.deleteData(id);
    }
}
