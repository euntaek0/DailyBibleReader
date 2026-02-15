import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const RADIUS_TOKENS: Array<{ label: string; varName: string; preview: string }> = [
  { label: "sm", varName: "--radius-sm", preview: "var(--radius-sm)" },
  { label: "md", varName: "--radius-md", preview: "var(--radius-md)" },
  { label: "lg", varName: "--radius-lg", preview: "var(--radius-lg)" },
  { label: "xl", varName: "--radius-xl", preview: "var(--radius-xl)" },
  { label: "pill", varName: "--radius-pill", preview: "var(--radius-pill)" },
  { label: "control (alias)", varName: "--radius-control", preview: "var(--radius-control)" },
  { label: "surface (alias)", varName: "--radius-surface", preview: "var(--radius-surface)" },
];

function RadiusTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Radius Tokens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          라디우스는 컨트롤(버튼/인풋)과 서피스(카드/시트)에서 일관되게 쓰도록 토큰화합니다.
        </p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Scale</CardTitle>
          <p className="text-sm text-muted-foreground">
            CSS Vars: <span className="font-mono text-[0.85em]">--radius-*</span> / Tailwind:{" "}
            <span className="font-mono text-[0.85em]">rounded-sm|md|lg|xl</span>,{" "}
            <span className="font-mono text-[0.85em]">rounded-control</span>,{" "}
            <span className="font-mono text-[0.85em]">rounded-surface</span>,{" "}
            <span className="font-mono text-[0.85em]">rounded-pill</span>
          </p>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {RADIUS_TOKENS.map((token) => {
            const value = getCssVar(token.varName);
            return (
              <div key={token.varName} className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
                <div
                  className="h-12 w-12 border border-border/80 bg-card"
                  style={{ borderRadius: token.preview, boxShadow: "var(--shadow-1)" }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{token.label}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {token.varName} = {value || "(unavailable)"}
                  </p>
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
  title: "Foundation/Radius Tokens",
  render: () => <RadiusTokensStory />,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

