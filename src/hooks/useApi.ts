/**
 * React Hook for API Data Fetching & State Handling
 * Manages loading, data, empty, 401, 403, 404, 500 status codes, and execution states.
 */

import { useState, useEffect, useCallback, useRef, type Dispatch, type SetStateAction } from 'react';
import { ApiResponse } from '../types/apiContracts';

export type ApiStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error' | 'unauthorized' | 'forbidden' | 'not_found';

export interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: string, statusCode?: number) => void;
  transform?: (data: any) => T;
}

export interface UseApiResult<T, P extends any[] = any[]> {
  data: T | null;
  status: ApiStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
  isError: boolean;
  isUnauthorized: boolean;
  isForbidden: boolean;
  isNotFound: boolean;
  error: string | null;
  statusCode: number | null;
  execute: (...args: P) => Promise<ApiResponse<T>>;
  refetch: () => Promise<ApiResponse<T>>;
  setData: Dispatch<SetStateAction<T | null>>;
  reset: () => void;
}

export function useApi<T, P extends any[] = any[]>(
  apiFunction: (...args: P) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): UseApiResult<T, P> {
  const { immediate = false, initialData = null, onSuccess, onError, transform } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const lastArgsRef = useRef<P>([] as unknown as P);

  const execute = useCallback(
    async (...args: P): Promise<ApiResponse<T>> => {
      lastArgsRef.current = args;
      setStatus('loading');
      setError(null);
      setStatusCode(null);

      try {
        const response = await apiFunction(...args);
        const code = response.statusCode || (response.success ? 200 : 500);
        setStatusCode(code);

        if (response.success) {
          const rawData = response.data;
          const processedData = transform ? transform(rawData) : rawData;

          // Detect empty arrays or null responses
          const isEmpty = Array.isArray(processedData)
            ? processedData.length === 0
            : processedData === null || processedData === undefined;

          setData(processedData);
          setStatus(isEmpty ? 'empty' : 'success');

          if (onSuccess) {
            onSuccess(processedData as T);
          }

          return response;
        } else {
          const errorMsg = response.error || 'An unexpected error occurred';
          setError(errorMsg);

          if (code === 401) {
            setStatus('unauthorized');
          } else if (code === 403) {
            setStatus('forbidden');
          } else if (code === 404) {
            setStatus('not_found');
          } else {
            setStatus('error');
          }

          if (onError) {
            onError(errorMsg, code);
          }

          return response;
        }
      } catch (err: any) {
        const errorMsg = err.message || 'Network request failed';
        setError(errorMsg);
        setStatus('error');
        setStatusCode(500);

        if (onError) {
          onError(errorMsg, 500);
        }

        return {
          success: false,
          error: errorMsg,
          statusCode: 500,
        };
      }
    },
    [apiFunction, onSuccess, onError, transform]
  );

  const refetch = useCallback(() => {
    return execute(...lastArgsRef.current);
  }, [execute]);

  const reset = useCallback(() => {
    setData(initialData);
    setStatus('idle');
    setError(null);
    setStatusCode(null);
  }, [initialData]);

  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as P));
    }
  }, [immediate, execute]);

  return {
    data,
    status,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isEmpty: status === 'empty',
    isError: status === 'error',
    isUnauthorized: status === 'unauthorized',
    isForbidden: status === 'forbidden',
    isNotFound: status === 'not_found',
    error,
    statusCode,
    execute,
    refetch,
    setData,
    reset,
  };
}

export default useApi;
