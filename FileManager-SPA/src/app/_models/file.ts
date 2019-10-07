export interface File {
    id: number;
    fileName: string;
    ext: string;
    url: string;
    description: string;
    size: number;
    dateCreated: Date;
    dateModified: Date;
    fileManagerAdminId: number;
    nodeId: number;
}
