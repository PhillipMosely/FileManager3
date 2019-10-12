import { User } from './user';

export interface FileManagerAdmin {
    id: number;
    userId: number;
    subFolderName: string;
    folderData: string;
    dateCreated: Date;
    dateModified: Date;
    user: User;
    companyName: string;
    userName: string;
    email: string;
}
