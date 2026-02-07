'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

import { createSSEConnection } from '@/lib/api';

import type { SSEEvent, HospitalCallStatus, CallDisplayStatus } from '@/types';

interface UseHospitalStatusReturn {
  statuses: Record<number, HospitalCallStatus>;
  isConnected: boolean;
  error: string | null;
  matchedHospital: HospitalCallStatus | null;
  allRejected: boolean;
}

export function useHospitalStatus(
  channel: string | null
): UseHospitalStatusReturn {
  const [statuses, setStatuses] = useState<Record<number, HospitalCallStatus>>(
    {}
  );
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchedHospital, setMatchedHospital] =
    useState<HospitalCallStatus | null>(null);
  const [allRejected, setAllRejected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const updateStatus = useCallback(
    (
      hospitalId: number,
      status: CallDisplayStatus,
      hospitalName?: string,
      hospitalNumber?: string,
      message?: string
    ) => {
      const entry: HospitalCallStatus = {
        hospitalId,
        hospitalName,
        hospitalNumber,
        status,
        message,
        timestamp: new Date().toISOString(),
      };

      setStatuses((prev) => ({ ...prev, [hospitalId]: entry }));

      if (status === 'accepted') {
        setMatchedHospital(entry);
      }
    },
    []
  );

  useEffect(() => {
    if (!channel) return;

    const eventSource = createSSEConnection(channel);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data: SSEEvent = JSON.parse(event.data);

        switch (data.status) {
          case 'connected':
            setIsConnected(true);
            break;

          case 'calling':
            if (data.hospitalId !== undefined) {
              updateStatus(
                data.hospitalId,
                'calling',
                data.hospitalName,
                data.hospitalNumber,
                data.message
              );
            }
            break;

          case 'accepted':
            if (data.hospitalId !== undefined) {
              updateStatus(
                data.hospitalId,
                'accepted',
                data.hospitalName,
                data.hospitalNumber,
                data.message
              );
            }
            break;

          case 'rejected':
            if (data.hospitalId !== undefined) {
              updateStatus(
                data.hospitalId,
                'rejected',
                data.hospitalName,
                undefined,
                data.message
              );
            }
            break;

          case 'no_answer':
            if (data.hospitalId !== undefined) {
              updateStatus(
                data.hospitalId,
                'no_answer',
                data.hospitalName,
                undefined,
                data.message
              );
            }
            break;

          case 'all_rejected':
            setAllRejected(true);
            break;

          case 'AI_SERVER_ERROR':
            setError(data.message);
            break;
        }
      } catch {
        console.error('Failed to parse SSE event data');
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [channel, updateStatus]);

  return { statuses, isConnected, error, matchedHospital, allRejected };
}
