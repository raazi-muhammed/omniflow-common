export interface IProject {
    _id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: string;
    members: string[];
}
export interface IUser {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}
