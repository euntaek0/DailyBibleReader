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
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRecognition ? null : "Browser does not support Speech Recognition.";
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const offsetIndexRef = useRef(0); // Track where we "reset" within the continuous stream

  useEffect(() => {
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
      const startIndex = offsetIndexRef.current;

      // Ensure startIndex is within bounds. If event.results was cleared (e.g. restart), reset offset.
      const actualStartIndex = Math.min(startIndex, event.results.length);
      if (actualStartIndex !== startIndex) {
        offsetIndexRef.current = 0; // Reset if invalid
      }

      for (let i = actualStartIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "not-allowed") {
        setError("Microphone permission denied.");
        setIsListening(false);
      } else if (event.error === "no-speech") {
        // Ignore
      } else {
        // Only setError if it's a real error, to avoid flickering state
        // setError(`Error: ${event.error}`);
        // Often 'aborted' is fired on manual stop, irrelevant.
      }
    };

    recognition.onend = () => {
      // If we are "still listening" (state), implies we should restart or it was an accidental stop.
      // But for simplicity, we let it sync.
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        // Reset offset on new start
        offsetIndexRef.current = 0;
        setTranscript("");
        recognitionRef.current.start();
        setError(null);
      } catch (err) {
        console.error("Failed to start recognition:", err);
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

    // If not listening, just clear state is enough.
    // If listening, we need to update the offset using a hack or just Restart.
    // Hack: We can't access `event.results.length` here directly.
    // SO: The most robust way is to restart the engine.

    if (recognitionRef.current && isListening) {
      recognitionRef.current.abort(); // Abort clears history instantly
      // Loop back to start? onend will fire.
      // We rely on component to call startListening/stopListening flow or
      // we can implement auto-restart here but that gets messy.
      // Given ChapterReader calls resetTranscript THEN keeps listening...
      // ...actually ChapterReader stops listening in my code when moving to next verse? NO.

      // Let's modify this to just abort.
      // ChapterReader effect will see isListening become false?
      // Wait, ChapterReader doesn't restart it.

      // Correction: ChapterReader calls `resetTranscript()` but expects to KEEP LISTENING.
      // If I use `abort()`, it stops. I must restart it.
      setTimeout(() => {
        try {
          recognitionRef.current?.start();
        } catch (e) {
          console.log(e);
        }
      }, 50);
    }
  }, [isListening]);

  // Actually, keeping track of result length inside onresult reference is cleaner for "Soft Reset".
  // Let's store the lastLength in a ref too.
  const lastResultLengthRef = useRef(0);

  // Re-define onresult with access to lastResultLengthRef (via refs usage in effect, it's fine)
  // ... Wait, I can't modify onresult logic outside the effect easily without re-running effect.
  // BUT I can use a Ref that is read inside onresult.

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
