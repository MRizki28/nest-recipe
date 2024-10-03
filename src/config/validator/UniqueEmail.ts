import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
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

    async validate(value: string): Promise<boolean> {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1', [value]);
            return result.rowCount === 0;
        } catch (error) {
            console.error('Error checking email uniqueness:', error);
            return false;
        } finally {
            client.release();
        }
    }

    defaultMessage(): string {
        return 'Email $value already exists, please use another email';
    }
}
