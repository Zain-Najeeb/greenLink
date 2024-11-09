export interface CreateUserProps {
    email: string;
    password: string;
    options?: object;
}
export interface User {
    email: string;
    authenticated: boolean;    
}
