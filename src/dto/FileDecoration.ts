import { registerDecorator, ValidationOptions } from "class-validator";
import { FileUpload } from "src/config/validator/FIleUpload";

export function FileDecoration(validationOptions?: ValidationOptions){
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "fileUpload",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: FileUpload
        })
    }
}