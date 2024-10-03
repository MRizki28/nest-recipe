import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
    async createData(@Body() userDto: UserDto): Promise<any> {
        return await this.userService.createData(userDto);
    }
}
