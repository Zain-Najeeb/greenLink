import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiStatus, ApiError, ApiResponse, ApiState } from '../types/api.types';

type ApiFunction<TParams extends unknown[], TData> = (...args: TParams) => Promise<TData>;

interface UseApiCallResult<TParams extends unknown[], TData> {
  execute: (...params: TParams) => Promise<ApiResponse<TData>>;
  reset: () => void;
  status: ApiStatus;
  data: TData | null;
  error: ApiError | null;
  message: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
}

const useApiCall = <TParams extends unknown[], TData>(
  apiFunc: ApiFunction<TParams, TData>
): UseApiCallResult<TParams, TData> => {
  const [state, setState] = useState<ApiState<TData>>({
    status: ApiStatus.IDLE,
    data: null,
    error: null,
    message: ''
  });

  const reset = useCallback(() => {
    setState({
      status: ApiStatus.IDLE,
      data: null,
      error: null,
      message: ''
    });
  }, []);

  const formatError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        message: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
        code: axiosError.code,
        status: axiosError.response?.status,
        raw: error
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        raw: error
      };
    }

    return {
      message: 'An unknown error occurred',
      raw: error
    };
  };

  const execute = useCallback(
    async (...params: TParams): Promise<ApiResponse<TData>> => {
      try {
        setState(prev => ({
          ...prev,
          status: ApiStatus.LOADING,
          error: null,
          message: ''
        }));

        const response = await apiFunc(...params);

        setState({
          status: ApiStatus.SUCCESS,
          data: response,
          error: null,
          message: 'Request successful'
        });

        return {
          success: true,
          data: response,
          error: null
        };

      } catch (err) {
        const formattedError = formatError(err);

        setState({
          status: ApiStatus.ERROR,
          data: null,
          error: formattedError,
          message: formattedError.message
        });

        return {
          success: false,
          data: null,
          error: formattedError
        };
      }
    },
    [apiFunc]
  );

  return {
    execute,
    reset,
    status: state.status,
    data: state.data,
    error: state.error,
    message: state.message,
    isLoading: state.status === ApiStatus.LOADING,
    isSuccess: state.status === ApiStatus.SUCCESS,
    isError: state.status === ApiStatus.ERROR,
    isIdle: state.status === ApiStatus.IDLE
  };
};

export default useApiCall; 