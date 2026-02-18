import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

type TokenRow = {
  token: string;
  varName: string;
};

const SPACING_TOKENS: TokenRow[] = [
  { token: "spacing-1", varName: "--spacing-1" },
  { token: "spacing-2", varName: "--spacing-2" },
  { token: "spacing-3", varName: "--spacing-3" },
  { token: "spacing-4", varName: "--spacing-4" },
  { token: "spacing-5", varName: "--spacing-5" },
  { token: "spacing-6", varName: "--spacing-6" },
  { token: "spacing-7", varName: "--spacing-7" },
  { token: "spacing-8", varName: "--spacing-8" },
  { token: "spacing-9", varName: "--spacing-9" },
  { token: "spacing-10", varName: "--spacing-10" },
  { token: "spacing-11", varName: "--spacing-11" },
  { token: "spacing-12", varName: "--spacing-12" },
  { token: "spacing-13", varName: "--spacing-13" },
];

const BREAKPOINT_TOKENS: TokenRow[] = [
  { token: "breakpoint-mobile", varName: "--breakpoint-mobile" },
  { token: "breakpoint-desktop", varName: "--breakpoint-desktop" },
];

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function SpacingRow({ row }: { row: TokenRow }): React.JSX.Element {
  const value = getCssVar(row.varName);
  const px = Number.parseInt(value.replace("px", ""), 10);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
      <div className="w-36 min-w-0">
        <p className="text-sm font-semibold text-foreground">{row.token}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{row.varName}</p>
      </div>

      <div className="flex-1">
        <div
          className="h-3 rounded-full bg-brand-500/25"
          style={{ width: Number.isNaN(px) ? "0px" : `${Math.max(px, 2)}px` }}
          aria-label={`${row.token} preview`}
        />
      </div>

      <p className="w-16 text-right font-mono text-[11px] text-foreground">{value || "(unavailable)"}</p>
    </div>
  );
}

function BasicRow({ row }: { row: TokenRow }): React.JSX.Element {
  const value = getCssVar(row.varName);

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
      <div>
        <p className="text-sm font-semibold text-foreground">{row.token}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{row.varName}</p>
      </div>
      <p className="font-mono text-[11px] text-foreground">{value || "(unavailable)"}</p>
    </div>
  );
}

function SpacingTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Layout Primitives (v2)</h2>
        <p className="text-sm leading-6 text-muted-foreground">spacing과 breakpoint 토큰을 시안 기준으로 재정의했습니다.</p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">spacing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {SPACING_TOKENS.map((row) => (
            <SpacingRow key={row.token} row={row} />
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">breakpoint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {BREAKPOINT_TOKENS.map((row) => (
            <BasicRow key={row.token} row={row} />
          ))}
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
