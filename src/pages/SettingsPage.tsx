import { useEffect, useState } from "react";
import { Bell, Lock, UserRound } from "lucide-react";
import { toast } from "sonner";

import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { BoardRow } from "../components/ui/board-row.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";

type FontScale = "small" | "normal" | "large";

export function SettingsPage(): React.JSX.Element {
  const [fontScale, setFontScale] = useState<FontScale>(() => (document.documentElement.dataset.fontScale as FontScale) || "normal");
  const [highContrast, setHighContrast] = useState(() => document.documentElement.dataset.contrast === "high");
  const [dailyReminder, setDailyReminder] = useState(true);

  const [displayName, setDisplayName] = useState("사용자");
  const [email, setEmail] = useState("");
  const [shareUsageData, setShareUsageData] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? "high" : "";
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.dataset.fontScale = fontScale;
  }, [fontScale]);

  const handleSave = (): void => {
    toast.success("설정이 저장되었어요.");
  };

  const fontScaleLabelMap: Record<FontScale, string> = {
    small: "작게",
    normal: "보통",
    large: "크게",
  };

  return (
    <div className="flex h-full flex-col">
      <TopBar title="설정" subtitle="앱 설정과 개인정보를 관리하세요" variant="page" />

      <PageContainer>
        <div className="reader-column space-y-5">
          <Card className="border-border/80 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" aria-hidden="true" />
                앱 설정
              </CardTitle>
              <CardDescription>읽기 환경과 알림 옵션을 조정할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <BoardRow
                surface="subtle"
                collapsible
                title="기본 글자 크기"
                description={`현재: ${fontScaleLabelMap[fontScale]}`}
                defaultOpen
              >
                <div className="grid grid-cols-3 gap-2">
                  {(["small", "normal", "large"] as const).map((scale) => (
                    <Button
                      key={scale}
                      type="button"
                      size="sm"
                      variant={fontScale === scale ? "primary" : "secondaryWeak"}
                      onClick={() => setFontScale(scale)}
                      aria-pressed={fontScale === scale}
                    >
                      {fontScaleLabelMap[scale]}
                    </Button>
                  ))}
                </div>
              </BoardRow>

              <BoardRow
                surface="subtle"
                title="고대비 모드"
                trailing={
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(event) => setHighContrast(event.target.checked)}
                    className="h-4 w-4 accent-primary"
                    aria-label="고대비 모드"
                  />
                }
              />

              <BoardRow
                surface="subtle"
                title="매일 읽기 알림 받기"
                trailing={
                  <input
                    type="checkbox"
                    checked={dailyReminder}
                    onChange={(event) => setDailyReminder(event.target.checked)}
                    className="h-4 w-4 accent-primary"
                    aria-label="매일 읽기 알림 받기"
                  />
                }
              />
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-primary" aria-hidden="true" />
                개인 정보
              </CardTitle>
              <CardDescription>프로필 정보와 데이터 활용 동의를 변경할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="display-name" className="text-sm font-semibold text-foreground">
                  이름
                </label>
                <input
                  id="display-name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <BoardRow
                surface="subtle"
                title="서비스 개선을 위한 사용 데이터 공유"
                trailing={
                  <input
                    type="checkbox"
                    checked={shareUsageData}
                    onChange={(event) => setShareUsageData(event.target.checked)}
                    className="h-4 w-4 accent-primary"
                    aria-label="서비스 개선을 위한 사용 데이터 공유"
                  />
                }
              />

              <BoardRow
                surface="subtle"
                collapsible
                leading={<Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
                leadingClassName="text-muted-foreground"
                title="보안"
                description="비밀번호 변경과 로그인 기기 관리"
                defaultOpen={false}
              >
                <p className="text-sm leading-6 text-muted-foreground">비밀번호 변경과 로그인 기기 관리는 로그인 페이지에서 진행할 수 있습니다.</p>
              </BoardRow>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">
            설정 저장
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}
