import type { MatchResult } from "../../utils/textMatcher.ts";
import { Badge } from "../ui/badge.tsx";

interface StatusBadgeProps {
  status: MatchResult["status"];
  score?: number;
}

export function StatusBadge({ status, score }: StatusBadgeProps): React.JSX.Element {
  const percentageText = typeof score === "number" ? ` · ${Math.round(score * 100)}%` : "";

  if (status === "READ") {
    return <Badge variant="read">읽음{percentageText}</Badge>;
  }

  if (status === "PARTIAL") {
    return <Badge variant="partial">부분 일치{percentageText}</Badge>;
  }

  return <Badge variant="notread">읽기 전</Badge>;
}
