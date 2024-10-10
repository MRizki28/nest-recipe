import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class AddUserIdPipe implements PipeTransform {
    transform(value: UserDto, metadata: ArgumentMetadata) {
        // Ambil ID dari parameter URL
        const userId = metadata?.data; // metadata.data berisi id dari parameter route
        if (userId) {
            value['id'] = userId; // Menambahkan ID ke objek yang divalidasi
        }
        return value;
    }
}