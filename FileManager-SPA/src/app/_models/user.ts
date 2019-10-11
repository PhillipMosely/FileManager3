import { Company } from './company';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    dateCreated: Date;
    dateModified: Date;
    lastActive: any;
    photoUrl: string;
    city: string;
    country: string;
    company: Company;
}
