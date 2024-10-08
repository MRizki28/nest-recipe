import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from 'src/config/jwt/jwt.strategy';
import { FileUpload } from 'src/config/validator/FIleUpload';
import { UniqueEmail } from 'src/config/validator/UniqueEmail';
import { UserController } from 'src/controllers/user/user.controller';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/service/user/user.service';

@Module({
    imports: [SequelizeModule.forFeature([UserModel]),
    PassportModule,
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
    })
    ],
    providers: [UserService, JwtStrategy, UniqueEmail],
    controllers: [UserController],
})
export class UserModule { }
