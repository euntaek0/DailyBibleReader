import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

type RadiusToken = {
  token: string;
  varName: string;
  previewVar: string;
};

const RADIUS_TOKENS: RadiusToken[] = [
  { token: "radius-1", varName: "--radius-1", previewVar: "var(--radius-1)" },
  { token: "radius-2", varName: "--radius-2", previewVar: "var(--radius-2)" },
  { token: "radius-sm (alias)", varName: "--radius-sm", previewVar: "var(--radius-sm)" },
  { token: "radius-md (alias)", varName: "--radius-md", previewVar: "var(--radius-md)" },
  { token: "radius-lg (alias)", varName: "--radius-lg", previewVar: "var(--radius-lg)" },
  { token: "radius-xl (alias)", varName: "--radius-xl", previewVar: "var(--radius-xl)" },
];

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function RadiusTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Radius Primitives (v2)</h2>
        <p className="text-sm leading-6 text-muted-foreground">radius-1, radius-2를 기본 primitives로 두고 기존 UI alias와 함께 유지합니다.</p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">radius</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {RADIUS_TOKENS.map((token) => {
            const value = getCssVar(token.varName);
            return (
              <div key={token.token} className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
                <div className="h-12 w-12 border border-border/80 bg-card shadow-1" style={{ borderRadius: token.previewVar }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{token.token}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{token.varName}</p>
                  <p className="font-mono text-[11px] text-foreground">{value || "(unavailable)"}</p>
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
