'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { extractPatientData } from '@/lib/gemini';
import type { GeminiPatientExtraction } from '@/types';

interface VoiceInputFABProps {
  onExtraction: (data: GeminiPatientExtraction) => void;
}

const INTERVAL_MS = 2000;

export default function VoiceInputFAB({ onExtraction }: VoiceInputFABProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const lastProcessedRef = useRef('');
  const processingRef = useRef(false);

  const processTranscript = useCallback(
    async (text: string) => {
      if (!text.trim() || text.trim() === lastProcessedRef.current) return;
      if (processingRef.current) return;

      lastProcessedRef.current = text.trim();
      processingRef.current = true;
      setIsProcessing(true);

      try {
        const extraction = await extractPatientData(text);
        onExtraction(extraction);
      } catch (err) {
        console.error('Gemini extraction failed:', err);
      } finally {
        processingRef.current = false;
        setIsProcessing(false);
      }
    },
    [onExtraction]
  );

  useEffect(() => {
    if (!isListening || !transcript) return;

    const interval = setInterval(() => {
      processTranscript(transcript);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isListening, transcript, processTranscript]);

  useEffect(() => {
    if (!isListening && transcript) {
      processTranscript(transcript);
    }
  }, [isListening, transcript, processTranscript]);

  if (!isSupported) return null;

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      setShowPanel(true);
      startListening();
    }
  };

  const handleClose = () => {
    stopListening();
    resetTranscript();
    lastProcessedRef.current = '';
    setShowPanel(false);
  };

  const displayText =
    transcript + (interimTranscript ? ` ${interimTranscript}` : '');

  return (
    <div className="fixed right-4 bottom-20 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-24">
      <AnimatePresence>
        {showPanel && displayText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-card border-border w-72 rounded-xl border p-4 shadow-lg sm:w-80"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isListening && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                  </span>
                )}
                <span className="text-muted-foreground text-xs font-medium">
                  {isListening ? '음성 인식 중...' : '인식 완료'}
                </span>
                {isProcessing && (
                  <Loader2 className="text-primary h-3 w-3 animate-spin" />
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground rounded-md p-0.5 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-foreground max-h-24 overflow-y-auto text-sm leading-relaxed">
              {transcript}
              {interimTranscript && (
                <span className="text-muted-foreground">{` ${interimTranscript}`}</span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          type="button"
          onClick={handleToggle}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg transition-all',
            isListening
              ? 'bg-red-500 text-white shadow-red-500/30 hover:bg-red-600'
              : 'bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90'
          )}
        >
          {isProcessing ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}
