import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueEmail } from "src/config/validator/UniqueEmail";

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isEmailUnique",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: UniqueEmail
        })
    }
}