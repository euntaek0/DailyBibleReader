import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechPermissionState = "unknown" | "granted" | "denied";

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  permissionState: SpeechPermissionState;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

interface SpeechRecognitionResultAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  readonly length: number;
  [index: number]: SpeechRecognitionResultAlternativeLike;
}

interface SpeechRecognitionEventLike extends Event {
  readonly results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike extends Event {
  readonly error: string;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike;

function getSpeechConstructor(): SpeechRecognitionConstructorLike | null {
  if (typeof window === "undefined") {
    return null;
  }

  return (window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null) as SpeechRecognitionConstructorLike | null;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const isSupported = Boolean(getSpeechConstructor());

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [permissionState, setPermissionState] = useState<SpeechPermissionState>("unknown");
  const [error, setError] = useState<string | null>(() =>
    isSupported ? null : "이 브라우저는 음성 인식을 지원하지 않습니다."
  );

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const offsetIndexRef = useRef(0);
  const lastResultLengthRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.listening = isListening ? "true" : "false";

    return () => {
      root.dataset.listening = "false";
    };
  }, [isListening]);

  useEffect(() => {
    const SpeechRecognitionCtor = getSpeechConstructor();

    if (!SpeechRecognitionCtor) {
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ko-KR";

    recognition.onstart = () => {
      setIsListening(true);
      setPermissionState("granted");
      setError(null);
    };

    recognition.onresult = (event) => {
      const resultsLength = event.results.length;
      lastResultLengthRef.current = resultsLength;

      let startIndex = offsetIndexRef.current;
      if (resultsLength < startIndex) {
        startIndex = 0;
        offsetIndexRef.current = 0;
      }

      let currentTranscript = "";
      for (let i = startIndex; i < resultsLength; i += 1) {
        const result = event.results[i];
        const firstAlternative = result?.[0];
        if (firstAlternative?.transcript) {
          currentTranscript += firstAlternative.transcript;
        }
      }

      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setPermissionState("denied");
        setError("마이크 권한이 거부되었습니다.");
        setIsListening(false);
        return;
      }

      if (event.error === "aborted" || event.error === "no-speech") {
        return;
      }

      setError("음성 인식 중 오류가 발생했습니다.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) {
      return;
    }

    try {
      offsetIndexRef.current = 0;
      lastResultLengthRef.current = 0;
      setTranscript("");
      setError(null);
      recognitionRef.current.start();
    } catch {
      setError("마이크를 시작할 수 없어요. 잠시 후 다시 시도해 주세요.");
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) {
      return;
    }

    recognitionRef.current.stop();
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    offsetIndexRef.current = lastResultLengthRef.current;
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    permissionState,
    startListening,
    stopListening,
    resetTranscript,
  };
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructorLike;
    webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
  }
}
