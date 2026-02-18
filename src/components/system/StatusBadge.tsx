import type { MatchResult } from "../../utils/textMatcher.ts";
import { Badge } from "../ui/badge.tsx";

interface StatusBadgeProps {
  status: MatchResult["status"];
  score?: number;
}

export function StatusBadge({ status }: StatusBadgeProps): React.JSX.Element {
  if (status === "READ") {
    return <Badge variant="read">읽음</Badge>;
  }

  if (status === "PARTIAL") {
    return <Badge variant="partial">부분 일치</Badge>;
  }

  return <Badge variant="primaryWeak">읽기 전</Badge>;
}
