import { faker } from '@faker-js/faker';

export class DataHelper {
    static getValidFirstName(): string {
        return faker.person.firstName();
    }

    static getValidLastName(): string {
        return faker.person.lastName();
    }

    static getValidEmail(firstName: string, lastName: string) {
        firstName = firstName !== '' ? firstName : this.getValidFirstName();
        lastName = lastName !== '' ? lastName : this.getValidLastName();
        return faker.internet.email({
            firstName: firstName,
            lastName: lastName,
            provider: 'dsi.com',
            allowSpecialCharacters: false,
        });
    }

    static getValidAddress(): string {
        return faker.location.streetAddress(true);
    }

    static getRandomAge(min: number = 18, max: number = 77): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomSalary(min: number = 10000, max: number = 100000): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomDepartment(): string {
        return faker.commerce.department();
    }
}

