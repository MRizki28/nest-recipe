import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    async getAllData(): Promise<any> {
        return await this.userService.getAllData();
    }

    @Post('/create')
    async createData(@Body() userDto: UserDto): Promise<any> {
        return await this.userService.createData(userDto);
    }
}
