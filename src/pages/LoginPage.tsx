import { useState } from "react";
import { toast } from "sonner";

import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";

export function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    toast.success("로그인 요청을 보냈어요.");
  };

  return (
    <div className="flex h-full flex-col">
      <TopBar title="로그인" subtitle="계정으로 설정과 읽기 기록을 동기화하세요" variant="page" />

      <PageContainer>
        <div className="reader-column space-y-5">
          <Card className="border-border/80 bg-card shadow-1">
            <CardHeader>
              <CardTitle>계정 로그인</CardTitle>
              <CardDescription>이메일 로그인 후 기기 간 읽기 상태를 연동할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-semibold text-foreground">
                    이메일
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm font-semibold text-foreground">
                    비밀번호
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(event) => setKeepLoggedIn(event.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                  로그인 상태 유지
                </label>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    로그인
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => toast.info("비밀번호 재설정 링크를 준비 중입니다.")}>
                    비밀번호 찾기
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-muted/35">
            <CardContent className="space-y-2 p-5">
              <p className="text-sm font-semibold text-foreground">로그인 후 가능한 기능</p>
              <p className="text-sm leading-6 text-muted-foreground">읽기 진행률 동기화, 개인 설정 백업, 계정 기반 알림 설정</p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}
