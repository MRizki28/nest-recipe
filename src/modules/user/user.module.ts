import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from 'src/controllers/user/user.controller';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/service/user/user.service';

@Module({
    imports: [SequelizeModule.forFeature([UserModel])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
