import { IsNotEmpty, Validate } from "class-validator";
import { IsEmailUnique } from "../IsEmailUniqueDecoration";
import { UniqueEmail } from "src/config/validator/UniqueEmail";

export class UserDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @Validate(UniqueEmail)
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    img_profile: string;
}