import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

type LineToken = {
  token: string;
  varName: string;
  tailwind: string;
};

const LINE_TOKENS: LineToken[] = [
  { token: "stroke", varName: "--stroke", tailwind: "border-hairline" },
  { token: "line-2 (alias)", varName: "--line-2", tailwind: "border-thick" },
  { token: "line-4 (alias)", varName: "--line-4", tailwind: "border-heavy" },
];

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function LineTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Border Primitives (v2)</h2>
        <p className="text-sm leading-6 text-muted-foreground">`stroke`를 기본 border primitive로 두고 기존 line alias를 함께 유지합니다.</p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">border</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {LINE_TOKENS.map((token) => {
            const value = getCssVar(token.varName);
            return (
              <div key={token.token} className="rounded-xl border border-border/70 bg-background/65 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{token.token}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{token.varName}</p>
                  </div>
                  <p className="font-mono text-[11px] text-foreground">{value || "(unavailable)"}</p>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="font-mono text-[11px] text-muted-foreground">{token.tailwind}</p>
                  <div className={`h-0 w-full border-t ${token.tailwind} border-border`} />
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
  title: "Foundation/Line Tokens",
  render: () => <LineTokensStory />,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
