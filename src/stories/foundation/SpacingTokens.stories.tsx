import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const SPACING_TOKENS: Array<{ label: string; varName: string }> = [
  { label: "0", varName: "--space-0" },
  { label: "1 (4px)", varName: "--space-1" },
  { label: "2 (8px)", varName: "--space-2" },
  { label: "3 (12px)", varName: "--space-3" },
  { label: "4 (16px)", varName: "--space-4" },
  { label: "5 (20px)", varName: "--space-5" },
  { label: "6 (24px)", varName: "--space-6" },
  { label: "8 (32px)", varName: "--space-8" },
  { label: "10 (40px)", varName: "--space-10" },
  { label: "12 (48px)", varName: "--space-12" },
  { label: "16 (64px)", varName: "--space-16" },
];

function SpacingTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Spacing Tokens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          4px 그리드 기반 스페이싱 토큰입니다. 값은 <span className="font-mono text-[0.95em]">rem</span>로 정의되어 폰트 스케일 변경에도 자연스럽게 따라갑니다.
        </p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Scale</CardTitle>
          <p className="text-sm text-muted-foreground">
            CSS Vars: <span className="font-mono text-[0.85em]">--space-0 … --space-16</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {SPACING_TOKENS.map((token) => {
            const value = getCssVar(token.varName);

            return (
              <div key={token.varName} className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
                <div className="w-24">
                  <p className="text-sm font-semibold text-foreground">{token.label}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{token.varName}</p>
                </div>

                <div className="flex-1">
                  <div
                    className="h-3 rounded-full bg-primary/20"
                    style={{
                      width: `var(${token.varName})`,
                      minWidth: token.varName === "--space-0" ? "0" : "4px",
                    }}
                  />
                </div>

                <div className="w-28 text-right">
                  <p className="font-mono text-[11px] text-muted-foreground">{value || "(unavailable)"}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Layout Tokens</CardTitle>
          <p className="text-sm text-muted-foreground">
            실제 레이아웃에서 자주 쓰는 높이/여백 토큰입니다.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Topbar Height", varName: "--topbar-height" },
            { label: "Bottom Nav Height", varName: "--bottom-nav-height" },
            { label: "Content Gutter", varName: "--content-gutter" },
          ].map((row) => {
            const value = getCssVar(row.varName);
            return (
              <div key={row.varName} className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/65 p-3">
                <p className="text-sm font-semibold text-foreground">{row.label}</p>
                <div className="text-right">
                  <p className="font-mono text-[11px] text-muted-foreground">{row.varName}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{value || "(unavailable)"}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: "Foundation/Spacing Tokens",
  render: () => <SpacingTokensStory />,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

