import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Pool } from "pg";

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: 5432,
        });
    }

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        console.log('args', args);
        const client = await this.pool.connect();
        const id = args.object['id'];
        try {
            if(id) {
                const result = await client.query('SELECT email FROM users WHERE email = $1 AND id != $2', [value, id]);
                return result.rowCount === 0;
            }else{
                const result = await client.query('SELECT email FROM users WHERE email = $1', [value]);
                return result.rowCount === 0;
            }
        } catch (error) {
            console.error('Error checking email uniqueness:', error);
            return false;
        } finally {
            client.release();
        }
    }

    defaultMessage(args: ValidationArguments): string {
        const id = args.object['id']
        const paramsId = args.value

        if(id != paramsId){
            return 'Pastikan id sama dengan id yang di update'
        }else{
            return 'Email $value already exists, please use another email';
        }
        
    }
}
