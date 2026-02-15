import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const TYPO_TOKENS: Array<{
  title: string;
  description: string;
  rows: Array<{
    label: string;
    varName: string;
    previewClassName?: string;
    previewStyle?: React.CSSProperties;
  }>;
}> = [
  {
    title: "Text Scale",
    description: "UI 텍스트 스케일과 Reader 텍스트 스케일을 CSS 변수로 정의합니다.",
    rows: [
      { label: "xs", varName: "--text-xs", previewClassName: "text-ui-xs" },
      { label: "sm", varName: "--text-sm", previewClassName: "text-ui-sm" },
      { label: "base", varName: "--text-base", previewClassName: "text-ui-base" },
      { label: "lg", varName: "--text-lg", previewClassName: "text-ui-lg" },
      { label: "xl", varName: "--text-xl", previewClassName: "text-ui-xl" },
      { label: "2xl", varName: "--text-2xl", previewClassName: "text-ui-2xl" },
      {
        label: "3xl",
        varName: "--text-3xl",
        previewStyle: { fontSize: "var(--text-3xl)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--weight-semibold)" },
      },
      {
        label: "4xl",
        varName: "--text-4xl",
        previewStyle: { fontSize: "var(--text-4xl)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--weight-bold)" },
      },
      {
        label: "reader",
        varName: "--text-reader-min/--text-reader-max",
        previewClassName: "text-reader",
      },
    ],
  },
  {
    title: "Line Heights",
    description: "컴포넌트 기본 라인하이트 및 보조 라인하이트 토큰입니다.",
    rows: [
      { label: "tight", varName: "--leading-tight", previewStyle: { fontSize: "var(--text-lg)", lineHeight: "var(--leading-tight)" } },
      { label: "snug", varName: "--leading-snug", previewStyle: { fontSize: "var(--text-lg)", lineHeight: "var(--leading-snug)" } },
      { label: "normal", varName: "--leading-normal", previewStyle: { fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)" } },
      { label: "relaxed", varName: "--leading-relaxed", previewStyle: { fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)" } },
      { label: "ui", varName: "--line-height-ui", previewStyle: { fontSize: "var(--text-base)", lineHeight: "var(--line-height-ui)" } },
      { label: "reader", varName: "--line-height-reader", previewStyle: { fontSize: "var(--text-xl)", lineHeight: "var(--line-height-reader)" } },
    ],
  },
  {
    title: "Tracking & Weights",
    description: "자주 쓰는 letter-spacing / font-weight 토큰입니다.",
    rows: [
      {
        label: "tracking-tight",
        varName: "--tracking-tight",
        previewStyle: { fontSize: "var(--text-xl)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--weight-semibold)" },
      },
      {
        label: "tracking-snug",
        varName: "--tracking-snug",
        previewStyle: { fontSize: "var(--text-xl)", letterSpacing: "var(--tracking-snug)", fontWeight: "var(--weight-semibold)" },
      },
      {
        label: "tracking-normal",
        varName: "--tracking-normal",
        previewStyle: { fontSize: "var(--text-xl)", letterSpacing: "var(--tracking-normal)", fontWeight: "var(--weight-semibold)" },
      },
      {
        label: "tracking-wide",
        varName: "--tracking-wide",
        previewStyle: { fontSize: "var(--text-sm)", letterSpacing: "var(--tracking-wide)", fontWeight: "var(--weight-semibold)", textTransform: "uppercase" },
      },
      {
        label: "weight-regular",
        varName: "--weight-regular",
        previewStyle: { fontSize: "var(--text-base)", fontWeight: "var(--weight-regular)" },
      },
      {
        label: "weight-medium",
        varName: "--weight-medium",
        previewStyle: { fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)" },
      },
      {
        label: "weight-semibold",
        varName: "--weight-semibold",
        previewStyle: { fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)" },
      },
      {
        label: "weight-bold",
        varName: "--weight-bold",
        previewStyle: { fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)" },
      },
    ],
  },
];

function TypographyTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Typography Tokens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          텍스트 크기/라인하이트/트래킹/웨이트를 토큰화했습니다. 기반 값은 <span className="font-mono text-[0.95em]">src/styles/globals.css</span>에 있습니다.
        </p>
      </div>

      {TYPO_TOKENS.map((section) => (
        <Card key={section.title} className="border-border/80 bg-card shadow-1">
          <CardHeader className="space-y-2 pb-3">
            <CardTitle className="text-lg">{section.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {section.rows.map((row) => {
              const value = row.varName.includes("/")
                ? `${getCssVar("--text-reader-min")} … ${getCssVar("--text-reader-max")}`
                : getCssVar(row.varName);

              return (
                <div key={`${section.title}-${row.label}`} className="flex flex-col gap-1 rounded-xl border border-border/70 bg-background/65 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">{row.label}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{row.varName}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className={row.previewClassName ?? "text-sm"} style={row.previewStyle}>
                      오늘의 말씀을 읽어보세요. The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                  <p className="font-mono text-[11px] leading-4 text-muted-foreground">{value || "(unavailable)"}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
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

