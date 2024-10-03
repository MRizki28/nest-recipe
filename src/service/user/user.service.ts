import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/dto/user/user.dto';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: typeof UserModel,
        private readonly jwtService: JwtService
    ) { }

    async getAllData(): Promise<any> {
        const data = await this.userModel.findAll();
        if (data) {
            return data;
        }

        return {
            message: 'Data not found'
        }

    }

    async createData(userDto: UserDto): Promise<any> {
        try {
            const { name, email, password, img_profile } = userDto
            const user = new this.userModel();
            user.name = name;
            user.email = email;
            user.password = password;
            user.img_profile = img_profile;
            user.access_token = this.jwtService.sign({ id: user.id, email: user.email });
            await user.save();
            return {
                message: 'Data created successfully',
                data: user,
                access_token: user.access_token
            }
        } catch (error) {
            console.log(error)
        };
    }

}
