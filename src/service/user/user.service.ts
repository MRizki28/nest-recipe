import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { createWriteStream } from 'fs';
import { UserDto } from 'src/dto/user/user.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserModel } from 'src/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

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

    async updateData(id, userUpdateDto: UserUpdateDto, img_profile: Express.Multer.File): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, email, password } = userUpdateDto;
                const user = await this.userModel.findOne({
                    where: {
                        id
                    }
                });

                console.log(user)

                if (user) {
                    user.id = id;
                    user.name = name;
                    user.email = email;
                    user.password = password;

                    if (img_profile) {
                        const filename = `${uuidv4()}-${img_profile.originalname}`;
                        const path = `./public/uploads/${filename}`;
                        const writeStream = createWriteStream(path);
                        const oldPath = `./public/uploads/${user.img_profile}`;

                        if(await fs.existsSync(oldPath)){
                            await fs.unlinkSync(oldPath);
                        }

                        const fileUploadPromise = new Promise((resolve, reject) => {
                            writeStream.on('finish', () => resolve(true));
                            writeStream.on('error', (err) => reject(err));
                            writeStream.write(img_profile.buffer);
                            writeStream.end();
                        });

                        await fileUploadPromise;
                        user.img_profile = filename;
                    }

                    await user.save();
                    resolve({
                        message: 'Data updated successfully',
                        data: user
                    });
                } else {
                    reject({
                        message: 'Data not found'
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async deleteData(id: string): Promise<any>{
        try {
            const user = await this.userModel.findOne({
                where: {
                    id
                }
            });

            if(user){
                await user.destroy();
                return {
                    message: 'Data deleted successfully'
                }
            }

            return {
                message: 'Data not found'
            }
        } catch (error) {
            console.log(error);
        };
        
    }

}
