import type { MatchResult } from "../../utils/textMatcher.ts";
import { Badge } from "../ui/badge.tsx";

interface StatusBadgeProps {
  status: MatchResult["status"];
  score?: number;
}

export function StatusBadge({ status, score }: StatusBadgeProps): React.JSX.Element {
  if (status === "READ") {
    return <Badge variant="read">읽음 {typeof score === "number" ? `${Math.round(score * 100)}%` : ""}</Badge>;
  }

  if (status === "PARTIAL") {
    return <Badge variant="partial">부분 일치 {typeof score === "number" ? `${Math.round(score * 100)}%` : ""}</Badge>;
  }

  return <Badge variant="notread">읽기 전</Badge>;
}
