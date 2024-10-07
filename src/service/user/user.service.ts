import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { createWriteStream } from 'fs';
import { UserDto } from 'src/dto/user/user.dto';
import { UserModel } from 'src/models/user.model';
import { v4 as uuidv4 } from 'uuid';

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

    async createData(userDto: UserDto, img_profile: Express.Multer.File): Promise<any> {
        try {
            const { name, email, password } = userDto
            const user = new this.userModel();

            user.name = name;
            user.email = email;
            user.password = password;

            const filename = `${uuidv4()}-${img_profile.originalname}`;
            const path = `./public/uploads/${filename}`;
            const writeStream = createWriteStream(path);

            const fileUploadPromise = new Promise((resolve, reject) => {
                writeStream.on('finish', () => resolve(true));
                writeStream.on('error', (err) => reject(err));
                writeStream.write(img_profile.buffer);
                writeStream.end();
            });

            await fileUploadPromise;
            user.img_profile = filename;

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

    async getDataById(id: string): Promise<any> {
        const data = await this.userModel.findOne({
            where: {
                id
            }
        });

        if (data) {
            return data;
        }

        return {
            message: 'Data not found'
        }
    }

}
