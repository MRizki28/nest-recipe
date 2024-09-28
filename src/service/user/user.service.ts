import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/dto/user/user.dto';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: typeof UserModel,
    ) { }

    async getAllData(): Promise<any> {
        const data = await this.userModel.findAll();
        if(data) {
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
            await user.save();
            return {
                message: 'Data created successfully',
                data: user
            }
        } catch (error) {
            console.log(error)
        };
    }

}
