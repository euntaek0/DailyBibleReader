import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const LINE_TOKENS: Array<{ label: string; varName: string; tailwind: string }> = [
  { label: "hairline", varName: "--line-1", tailwind: "border-hairline" },
  { label: "thick", varName: "--line-2", tailwind: "border-thick" },
  { label: "heavy", varName: "--line-4", tailwind: "border-heavy" },
];

function LineTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Line Width Tokens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          보더/디바이더에서 쓰는 선 두께 토큰입니다. (예: <span className="font-mono text-[0.95em]">border-hairline</span>)
        </p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Border Width</CardTitle>
          <p className="text-sm text-muted-foreground">
            CSS Vars: <span className="font-mono text-[0.85em]">--line-*</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {LINE_TOKENS.map((token) => {
            const value = getCssVar(token.varName);
            return (
              <div key={token.varName} className="rounded-xl border border-border/70 bg-background/65 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{token.label}</p>
                  <div className="text-right">
                    <p className="font-mono text-[11px] text-muted-foreground">{token.varName}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{value || "(unavailable)"}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] text-muted-foreground">{token.tailwind}</p>
                    <div className="flex-1" />
                  </div>
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

