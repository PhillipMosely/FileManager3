export interface Role {
    id: number;
    roleName: string;
    description: string;
    isSuperUser: boolean;
    isCompanyAdmin: boolean;
    dateCreated: Date;
    dateModified: Date;
}
