export interface CreateUserProps {
    email: string;
    password: string;
    options?: any;
}
export interface User {
    id: string,
    name: string, 
    email: string;
    points: number, 
    routes: Route[]
    score: number, 
    ride_count: number,
    total_distance: number 
}
export interface Route {
    source: string, 
    destination: string,
    count?: number, 
}