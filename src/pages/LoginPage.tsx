import { useState } from "react";
import { toast } from "sonner";

import { useAuthStore } from "../stores/authStore.ts";
import { signInWithPassword } from "../utils/auth.ts";
import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { BoardRow } from "../components/ui/board-row.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { Switch } from "../components/ui/switch.tsx";

export function LoginPage(): React.JSX.Element {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setSession = useAuthStore((state) => state.setSession);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!identifier || !password) {
      toast.error("아이디(또는 이메일)와 비밀번호를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await signInWithPassword(identifier, password);
      setSession(session);
      toast.success("로그인 되었어요.");

      if (!keepLoggedIn) {
        toast.message("로그인 유지가 꺼져 있어요. 팝업을 닫으면 다시 로그인해야 할 수 있어요.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "로그인에 실패했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <TopBar title="로그인" subtitle="계정으로 설정과 읽기 기록을 동기화하세요" variant="page" appearance="translucent" />

      <PageContainer withBottomInset={false}>
        <div className="reader-column space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>계정 로그인</CardTitle>
              <CardDescription>이메일 로그인 후 기기 간 읽기 상태를 연동할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="login-id" className="text-sm font-semibold text-foreground">
                    아이디 또는 이메일
                  </label>
                  <input
                    id="login-id"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="admin 또는 name@example.com"
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                    disabled={isSubmitting}
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
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <BoardRow
                  surface="subtle"
                  title="로그인 상태 유지"
                  control={
                    <Switch
                      checked={keepLoggedIn}
                      onCheckedChange={setKeepLoggedIn}
                      aria-label="로그인 상태 유지"
                      disabled={isSubmitting}
                    />
                  }
                />

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" loading={isSubmitting}>
                    로그인
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    disabled={isSubmitting}
                    onClick={() => toast.info("비밀번호 재설정 링크를 준비 중입니다.")}
                  >
                    비밀번호 찾기
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <section className="rounded-2xl border border-border/75 bg-background px-4 py-3">
            <p className="text-sm font-semibold text-foreground">로그인 후 가능한 기능</p>
            <p className="mt-1 text-sm leading-[1.45] text-muted-foreground">읽기 진행률 동기화, 개인 설정 백업, 계정 기반 알림 설정</p>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
