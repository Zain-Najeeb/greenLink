export interface RouteInformation {
    lat: number;
    lng: number;
    time: string;
    type: 'BUS' | 'WALKING';
    wait?: string, 
    departure?: string
    distanceFromPrevious: string;
  }
  
  export interface AddressCoordinates {
    [address: string]: RouteInformation;
  }
  
  export interface AddressInfo {
    type: string;
    address: string;
  }
  
  export interface NavigationResult {
    addresses: AddressInfo[];
    RouteInfo: AddressCoordinates;
  }