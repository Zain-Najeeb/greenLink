export interface CreateUserProps {
    email: string;
    password: string;
    options?: any;
}
export interface User {
    email: string;
    authenticated: boolean;    
}
