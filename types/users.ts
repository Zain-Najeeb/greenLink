import { Float } from "react-native/Libraries/Types/CodegenTypes";

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
    eco_score: number, 
    ride_count: number,
    total_distance: number 
}

export interface Stats {
    points: number,
    distance: Float,
    ride_count: number,
    eco_score: number
}

export interface Route {
    source: string, 
    destination: string,
    count?: number, 
}