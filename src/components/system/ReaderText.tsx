import { cn } from "../../lib/utils.ts";

interface ReaderTextProps {
  text: string;
  matchedIndices?: boolean[];
  focusIndices?: number[];
  missedIndices?: number[];
  dimUnmatched?: boolean;
  className?: string;
}

export function ReaderText({
  text,
  matchedIndices,
  focusIndices = [],
  missedIndices = [],
  dimUnmatched = false,
  className,
}: ReaderTextProps): React.JSX.Element {
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  return (
    <p className={cn("text-reader leading-reader font-medium tracking-[-0.012em] text-foreground", className)}>
      {words.map((word, index) => {
        const isRead = Boolean(matchedIndices?.[index]);
        const isFocus = focusIndices.includes(index);
        const isMissed = missedIndices.includes(index);

        return (
          <span
            key={`${word}-${index}`}
            className={cn(
              "reader-word",
              isRead && "reader-word-read",
              isFocus && "reader-word-focus",
              isMissed && "reader-word-miss",
              dimUnmatched && !isRead && !isFocus && "text-foreground/72"
            )}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
