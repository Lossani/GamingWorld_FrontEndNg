export interface User {
    id: number,
    username: string,
    email: string,
    name: string,
    lastName: string,
    role: string,
    premium: boolean,
    password?:string;
}
