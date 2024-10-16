import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../service/app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/user.model';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
require('dotenv').config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'database', // Ganti 'localhost' dengan 'database'
      port: 5432, // Pastikan port ini sesuai dengan yang ditetapkan di docker-compose
      username: process.env.DB_USERNAME, // Gunakan variabel dari .env jika perlu
      password: process.env.DB_PASSWORD, // Gunakan variabel dari .env jika perlu
      database: process.env.DB_DATABASE, // Gunakan variabel dari .env jika perlu
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
