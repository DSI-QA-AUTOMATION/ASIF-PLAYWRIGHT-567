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

    static getRandomDateOfBirth(): string {
        const start = new Date(1950, 0, 1);
        const end = new Date(2005, 11, 31);
        const dob = 
            new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const day = String(dob.getDate()).padStart(2, '0');
        const month = String(dob.getMonth() + 1).padStart(2, '0');
        const year = dob.getFullYear();
        return `${day} ${month} ${year}`;
    }

    static getValidMobileNumber(): string {
        return faker.string.numeric(10);
    }

    static getRandomCurrentAddress(): string {
        return faker.location.streetAddress(true);
    }

    static getRandomState(): string {
        const states = [
            'NCR',
            'Uttar Pradesh',
            'Haryana',
            'Rajasthan'
        ];
        return states[Math.floor(Math.random() * states.length)];
    }

    static getRandomCity(state: string): string {
        const citiesByState: { [key: string]: string[] } = {
            'NCR': ['Delhi', 'Gurgaon', 'Noida'],
            'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
            'Haryana': ['Karnal', 'Panipat'],
            'Rajasthan': ['Jaipur', 'Jaiselmer']
        };
        const cities = citiesByState[state];
        return cities[Math.floor(Math.random() * cities.length)];
    }
}

