'use client';

import { useState, useCallback } from 'react';

import { startMatching } from '@/lib/api';

import type { StartMatchingRequest, StartMatchingResponse } from '@/types';

interface UseEmergencyRequestReturn {
  submit: (data: StartMatchingRequest) => Promise<StartMatchingResponse>;
  isLoading: boolean;
  error: string | null;
  data: StartMatchingResponse | null;
}

export function useEmergencyRequest(): UseEmergencyRequestReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StartMatchingResponse | null>(null);

  const submit = useCallback(
    async (
      requestData: StartMatchingRequest
    ): Promise<StartMatchingResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await startMatching(requestData);
        setData(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { submit, isLoading, error, data };
}
