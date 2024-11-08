export enum ApiStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
  }
  
  export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    raw?: unknown;
  }
  
  export interface ApiResponse<TData> {
    success: boolean;
    data: TData | null;
    error: ApiError | null;
  }
  
  export interface ApiState<TData> {
    status: ApiStatus;
    data: TData | null;
    error: ApiError | null;
    message: string;
  }
  