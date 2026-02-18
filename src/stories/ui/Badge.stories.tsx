import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { Badge } from "../../components/ui/badge.tsx";

type BadgeVariant = NonNullable<React.ComponentProps<typeof Badge>["variant"]>;
type BadgeSize = NonNullable<React.ComponentProps<typeof Badge>["size"]>;

type Column = {
  label: string;
  solid: BadgeVariant;
  weak: BadgeVariant;
};

const COLUMNS: Column[] = [
  { label: "Primary", solid: "primary", weak: "primaryWeak" },
  { label: "Neutral", solid: "neutral", weak: "neutralWeak" },
  { label: "Signal", solid: "signal", weak: "signalWeak" },
  { label: "Warning", solid: "warning", weak: "warningWeak" },
  { label: "Danger", solid: "danger", weak: "dangerWeak" },
  { label: "Success", solid: "success", weak: "successWeak" },
];

const SIZE_ROWS: Array<{ label: string; size: BadgeSize }> = [
  { label: "XL", size: "xl" },
  { label: "L", size: "lg" },
  { label: "M", size: "md" },
  { label: "S", size: "sm" },
];

function ToneMatrix({ tone }: { tone: "solid" | "weak" }): React.JSX.Element {
  return (
    <div className="space-y-3">
      {SIZE_ROWS.map((row) => (
        <div key={`${tone}-${row.size}`} className="grid grid-cols-[48px_1fr] items-center gap-4">
          <p className="text-[11px] font-medium text-muted-foreground">{row.label}</p>
          <div className="grid grid-cols-6 gap-5">
            {COLUMNS.map((column) => (
              <Badge key={`${tone}-${row.size}-${column.label}`} variant={tone === "solid" ? column.solid : column.weak} size={row.size} className="justify-center">
                배지
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BadgeMatrixStory(): React.JSX.Element {
  return (
    <div className="space-y-5 p-6">
      <div className="space-y-2">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Badge System v2</h2>
        <p className="text-sm leading-[1.5] text-muted-foreground">
          디자인 시스템 토큰(brand/neutral/signals) 기반 색상군 6종과 톤(Solid/Soft), 사이즈(S~XL) 매트릭스입니다.
        </p>
      </div>

      <Card className="border-border/80 bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Color Matrix</CardTitle>
        </CardHeader>
        <CardContent className="pb-5 pt-2">
          <div className="overflow-x-auto pb-1">
            <div className="min-w-[930px] space-y-5 rounded-2xl bg-neutral-50/70 p-5">
              <div className="grid grid-cols-[48px_1fr] items-center gap-4 border-b border-border/60 pb-3">
                <p className="text-[11px] font-medium text-muted-foreground">Size</p>
                <div className="grid grid-cols-6 gap-5">
                  {COLUMNS.map((column) => (
                    <p key={`head-${column.label}`} className="text-center text-[11px] font-medium text-muted-foreground">
                      {column.label}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Solid</p>
                <ToneMatrix tone="solid" />
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Soft</p>
                <ToneMatrix tone="weak" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    frame: "wide",
  },
  args: {
    variant: "read",
    size: "md",
    children: "읽음 87%",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => <BadgeMatrixStory />,
};
