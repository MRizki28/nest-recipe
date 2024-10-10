import { isNotEmpty, IsNotEmpty, validate, Validate } from "class-validator";
import { IsEmailUnique } from "../IsEmailUniqueDecoration";
import { UniqueEmail } from "src/config/validator/UniqueEmail";
import { FileUpload } from "src/config/validator/FIleUpload";
import { File } from "buffer";
import { idIsSame } from "src/config/validator/IdIsSame";

export class UserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @Validate(UniqueEmail)
    email: string;
    @IsNotEmpty()
    password: string;

    img_profile: Express.Multer.File;
}