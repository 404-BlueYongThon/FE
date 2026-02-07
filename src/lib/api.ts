import { getApiUrl } from './env';

import type { StartMatchingRequest, StartMatchingResponse } from '@/types';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function startMatching(
  data: StartMatchingRequest
): Promise<StartMatchingResponse> {
  const url = `${getApiUrl()}/matching/start`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Matching request failed: ${response.statusText}`
    );
  }

  return response.json() as Promise<StartMatchingResponse>;
}

export function createSSEConnection(channel: string): EventSource {
  const url = `${getApiUrl()}/sse/${channel}`;
  return new EventSource(url);
}

export { ApiError };
