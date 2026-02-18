import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

type TokenRow = {
  token: string;
  varName: string;
};

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const FONT_FAMILY_TOKENS: TokenRow[] = [
  { token: "font-family-1", varName: "--font-family-1" },
  { token: "font-family-2", varName: "--font-family-2" },
];

const FONT_WEIGHT_TOKENS: TokenRow[] = [
  { token: "font-weight-400", varName: "--font-weight-400" },
  { token: "font-weight-500", varName: "--font-weight-500" },
  { token: "font-weight-700", varName: "--font-weight-700" },
];

const FONT_SCALE_TOKENS: TokenRow[] = [
  { token: "font-scale-100", varName: "--font-scale-100" },
  { token: "font-scale-200", varName: "--font-scale-200" },
  { token: "font-scale-300", varName: "--font-scale-300" },
  { token: "font-scale-400", varName: "--font-scale-400" },
  { token: "font-scale-500", varName: "--font-scale-500" },
  { token: "font-scale-600", varName: "--font-scale-600" },
  { token: "font-scale-700", varName: "--font-scale-700" },
  { token: "font-scale-800", varName: "--font-scale-800" },
  { token: "font-scale-900", varName: "--font-scale-900" },
  { token: "font-scale-1000", varName: "--font-scale-1000" },
  { token: "font-scale-1100", varName: "--font-scale-1100" },
];

const TYPO_LENGTH_TOKENS: TokenRow[] = [{ token: "line-length", varName: "--line-length" }];

function BasicRow({ row, trailing }: { row: TokenRow; trailing?: React.ReactNode }): React.JSX.Element {
  const value = getCssVar(row.varName);

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{row.token}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{row.varName}</p>
      </div>
      <div className="flex items-center gap-3">
        {trailing}
        <p className="font-mono text-[11px] text-foreground">{value || "(unavailable)"}</p>
      </div>
    </div>
  );
}

function FontFamilyRows(): React.JSX.Element {
  return (
    <div className="space-y-3">
      {FONT_FAMILY_TOKENS.map((row, index) => {
        const family = getCssVar(row.varName);
        return (
          <BasicRow
            key={row.token}
            row={row}
            trailing={
              <span
                className="max-w-[280px] truncate text-sm text-foreground"
                style={{ fontFamily: family }}
                title={family}
              >
                {index === 0 ? "Inter preview" : "EB Garamond preview"}
              </span>
            }
          />
        );
      })}
    </div>
  );
}

function FontScaleRows(): React.JSX.Element {
  return (
    <div className="space-y-3">
      {FONT_SCALE_TOKENS.map((row) => {
        const value = getCssVar(row.varName);
        const px = Number.parseInt(value.replace("px", ""), 10);
        const previewSize = Number.isNaN(px) ? 16 : Math.min(px, 36);

        return (
          <BasicRow
            key={row.token}
            row={row}
            trailing={
              <span className="text-foreground" style={{ fontSize: `${previewSize}px`, lineHeight: 1.1 }}>
                Ag
              </span>
            }
          />
        );
      })}
    </div>
  );
}

function TypographyTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Typography Primitives (v2)</h2>
        <p className="text-sm leading-6 text-muted-foreground">font-family, font-weight, font-scale, line-length 토큰을 시안 기준으로 재정의했습니다.</p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">typography/font-family</CardTitle>
        </CardHeader>
        <CardContent>
          <FontFamilyRows />
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">typography/font-weight</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {FONT_WEIGHT_TOKENS.map((row) => {
            const value = getCssVar(row.varName);
            const numericWeight = Number.parseInt(value, 10);
            return (
              <BasicRow
                key={row.token}
                row={row}
                trailing={
                  <span className="text-sm text-foreground" style={{ fontWeight: Number.isNaN(numericWeight) ? 400 : numericWeight }}>
                    Weight preview
                  </span>
                }
              />
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">typography/font-scale</CardTitle>
        </CardHeader>
        <CardContent>
          <FontScaleRows />
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">typography/length</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {TYPO_LENGTH_TOKENS.map((row) => (
            <BasicRow key={row.token} row={row} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: "Foundation/Typography Tokens",
  render: () => <TypographyTokensStory />,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
