import { Body, Controller, Get, Param, Post, UnprocessableEntityException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';
import { JwtAuthGuard } from 'src/config/jwt/jwtAuth.guard';
import { UserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAllData(): Promise<any> {
        return await this.userService.getAllData();
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('img_profile'))
    async createData(@UploadedFile() img_profile, @Body() userDto: UserDto): Promise<any> {
        if(!img_profile) {
            throw new UnprocessableEntityException({
                status: 'not validate',
                message: [
                    {
                        field: 'img_profile',
                        error: 'Image Profile is required',
                    },
                ],
            });
        }
        return await this.userService.createData(userDto, img_profile);
    }

    @Get('get/:id')
    async getDataById(@Param('id') id: string): Promise<any> {
        return await this.userService.getDataById(id);
    }
}
