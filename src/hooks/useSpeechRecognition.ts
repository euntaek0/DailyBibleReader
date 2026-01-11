import { useState, useEffect, useRef, useCallback } from "react";

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(() => {
    // @ts-expect-error - vendor prefix
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRecognition ? null : "Browser does not support Speech Recognition.";
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const offsetIndexRef = useRef(0); // Track where we "reset" within the continuous stream
  const lastResultLengthRef = useRef(0); // Track the latest result length to perform soft reset

  useEffect(() => {
    // @ts-expect-error - vendor prefix
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ko-KR";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let currentTranscript = "";
      const resultsLength = event.results.length;
      lastResultLengthRef.current = resultsLength; // Update length tracker

      let startIndex = offsetIndexRef.current;

      // Detect engine restart (results array cleared)
      // If current results length is smaller than our offset, it means the engine likely reset the session.
      if (resultsLength < startIndex) {
        offsetIndexRef.current = 0;
        startIndex = 0;
      }

      for (let i = startIndex; i < resultsLength; i++) {
        if (event.results[i] && event.results[i][0]) {
          currentTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "not-allowed") {
        setError("Microphone permission denied.");
        setIsListening(false);
      } else if (event.error === "no-speech") {
        // Ignore, but maybe we should keep listening?
        // Some browsers stop after no-speech.
      } else {
        // aborted is common, ignore
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        // Reset state
        offsetIndexRef.current = 0;
        lastResultLengthRef.current = 0;
        setTranscript("");
        setError(null);
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
        // If it says "already started", we just ensure isListening is true
        setIsListening(true);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Soft reset: sets the offset to current results length so future updates ignore past results
  const resetTranscript = useCallback(() => {
    setTranscript("");
    // Move the offset to the end of the current results
    offsetIndexRef.current = lastResultLengthRef.current;
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}

// Type definitions...
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
type SpeechRecognition = any;
type SpeechRecognitionEvent = any;
type SpeechRecognitionErrorEvent = any;
