import { IsNotEmpty, Validate } from "class-validator";
import { IsEmailUnique } from "../IsEmailUniqueDecoration";
import { UniqueEmail } from "src/config/validator/UniqueEmail";
import { FileUpload } from "src/config/validator/FIleUpload";
import { File } from "buffer";

export class UserDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @Validate(UniqueEmail)
    email: string;
    @IsNotEmpty()
    password: string;
    
    img_profile: Express.Multer.File;   
}