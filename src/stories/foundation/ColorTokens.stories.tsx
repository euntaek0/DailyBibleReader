import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { cn } from "../../lib/utils.ts";

type PaletteKey = "primary" | "secondary" | "neutral" | "red" | "yellow" | "green";

const PALETTES: Array<{
  key: PaletteKey;
  title: string;
  steps: number[];
  sampleStep: number;
}> = [
  { key: "primary", title: "Primary", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], sampleStep: 500 },
  { key: "secondary", title: "Secondary", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], sampleStep: 500 },
  { key: "neutral", title: "Neutral", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], sampleStep: 900 },
  { key: "red", title: "Red", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], sampleStep: 500 },
  { key: "yellow", title: "Yellow (Amber)", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], sampleStep: 500 },
  { key: "green", title: "Green (Emerald)", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], sampleStep: 500 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hh >= 0 && hh < 1) {
    r = c;
    g = x;
  } else if (hh >= 1 && hh < 2) {
    r = x;
    g = c;
  } else if (hh >= 2 && hh < 3) {
    g = c;
    b = x;
  } else if (hh >= 3 && hh < 4) {
    g = x;
    b = c;
  } else if (hh >= 4 && hh < 5) {
    r = x;
    b = c;
  } else if (hh >= 5 && hh < 6) {
    r = c;
    b = x;
  }

  const toByte = (n: number) => clamp(Math.round((n + m) * 255), 0, 255);
  const rb = toByte(r).toString(16).padStart(2, "0");
  const gb = toByte(g).toString(16).padStart(2, "0");
  const bb = toByte(b).toString(16).padStart(2, "0");
  return `#${rb}${gb}${bb}`.toUpperCase();
}

function parseHslTriplet(triplet: string): { h: number; s: number; l: number } | null {
  const normalized = triplet.trim().replace(/\s+/g, " ");
  const match = /^(-?\d*\.?\d+)\s+(-?\d*\.?\d+)%\s+(-?\d*\.?\d+)%$/.exec(normalized);
  if (!match) return null;
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function getCssVar(name: string): string {
  if (typeof window === "undefined") {
    return "";
  }
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function CheckerSwatch({
  label,
  hsl,
  alpha = 1,
}: {
  label: string;
  hsl: string;
  alpha?: number;
}): React.JSX.Element {
  const parsed = parseHslTriplet(hsl);
  const hex = parsed ? hslToHex(parsed.h, parsed.s, parsed.l) : "";

  return (
    <div className="flex w-[88px] flex-col gap-2">
      <div
        className="relative h-12 w-full overflow-hidden rounded-lg border border-border/80"
        style={{
          backgroundImage:
            "linear-gradient(45deg, hsl(var(--neutral-200)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--neutral-200)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--neutral-200)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--neutral-200)) 75%)",
          backgroundSize: "12px 12px",
          backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: `hsl(${hsl} / ${alpha})` }} />
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-semibold tracking-[-0.01em] text-foreground">{label}</p>
        <p className="font-mono text-[11px] leading-4 text-muted-foreground">{hex || hsl}</p>
      </div>
    </div>
  );
}

function PaletteSection({ palette }: { palette: (typeof PALETTES)[number] }): React.JSX.Element {
  const sampleVar = `--${palette.key}-${palette.sampleStep}`;
  const sampleHsl = getCssVar(sampleVar);

  return (
    <Card className="border-border/80 bg-card shadow-1">
      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="text-lg">{palette.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          CSS Vars: <span className="font-mono text-[0.85em]">{`--${palette.key}-50 … --${palette.key}-950`}</span>
          {sampleHsl ? (
            <>
              {" "}
              (sample <span className="font-mono text-[0.85em]">{sampleVar}</span>:{" "}
              <span className="font-mono text-[0.85em]">{sampleHsl}</span>)
            </>
          ) : null}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {palette.steps.map((step) => {
            const varName = `--${palette.key}-${step}`;
            const value = getCssVar(varName);
            return <CheckerSwatch key={step} label={String(step)} hsl={value} />;
          })}
          {sampleHsl ? <CheckerSwatch label="A10" hsl={sampleHsl} alpha={0.1} /> : null}
        </div>
        <p className="text-xs text-muted-foreground">
          Tailwind:{" "}
          <span className="font-mono text-[0.95em]">{`bg-${palette.key}-500`}</span>,{" "}
          <span className="font-mono text-[0.95em]">{`text-${palette.key}-700`}</span>,{" "}
          <span className="font-mono text-[0.95em]">{`border-${palette.key}-200`}</span>
        </p>
      </CardContent>
    </Card>
  );
}

function ColorTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Global Color Tokens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Primary부터 시작해서 Neutral/Feedback(Red, Yellow, Green)까지 팔레트 스케일을 정의했습니다.
        </p>
      </div>

      <div className="grid gap-4">
        {PALETTES.map((palette) => (
          <PaletteSection key={palette.key} palette={palette} />
        ))}
      </div>

      <Card className={cn("border-border/80 bg-card shadow-1")}>
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>
            팔레트는 <span className="font-mono text-[0.95em]">src/styles/globals.css</span>의 CSS 변수로 정의되고,{" "}
            <span className="font-mono text-[0.95em]">tailwind.config.ts</span>에서{" "}
            <span className="font-mono text-[0.95em]">bg-primary-500</span> 같은 유틸로 매핑됩니다.
          </p>
          <p>
            기존 shadcn 토큰(<span className="font-mono text-[0.95em]">--primary</span>,{" "}
            <span className="font-mono text-[0.95em]">--background</span> 등)은 유지되며, 이 팔레트는 기반 스케일로 사용합니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: "Foundation/Color Tokens",
  render: () => <ColorTokensStory />,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

