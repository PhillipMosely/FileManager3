import { Company } from './company';
import { UserRole } from './userrole';

export interface User {
    id: number;
    userName: string;
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
    companyId: number;
    company: Company;
    roles: UserRole[];
}
