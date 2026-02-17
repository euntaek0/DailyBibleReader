import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

type ColorToken = {
  token: string;
  varName: string;
  hex: string;
};

type ColorGroup = {
  title: string;
  description: string;
  tokens: ColorToken[];
};

const COLOR_GROUPS: ColorGroup[] = [
  {
    title: "colors/brand",
    description: "Main brand scale",
    tokens: [
      { token: "brand-100", varName: "--brand-100", hex: "#dcdcff" },
      { token: "brand-200", varName: "--brand-200", hex: "#bfc3ff" },
      { token: "brand-300", varName: "--brand-300", hex: "#959bff" },
      { token: "brand-400", varName: "--brand-400", hex: "#616afb" },
      { token: "brand-500", varName: "--brand-500", hex: "#4f59fb" },
      { token: "brand-600", varName: "--brand-600", hex: "#3f47c9" },
      { token: "brand-700", varName: "--brand-700", hex: "#2f3597" },
      { token: "brand-800", varName: "--brand-800", hex: "#202464" },
      { token: "brand-900", varName: "--brand-900", hex: "#101232" },
    ],
  },
  {
    title: "colors/neutral",
    description: "Neutral grayscale primitives",
    tokens: [
      { token: "neutral-50", varName: "--neutral-50", hex: "#f2f2f2" },
      { token: "neutral-100", varName: "--neutral-100", hex: "#d9d9d9" },
      { token: "neutral-200", varName: "--neutral-200", hex: "#c0c0c0" },
      { token: "neutral-300", varName: "--neutral-300", hex: "#a6a6a6" },
      { token: "neutral-400", varName: "--neutral-400", hex: "#8d8d8d" },
      { token: "neutral-500", varName: "--neutral-500", hex: "#808080" },
      { token: "neutral-600", varName: "--neutral-600", hex: "#666666" },
      { token: "neutral-700", varName: "--neutral-700", hex: "#4d4d4d" },
      { token: "neutral-800", varName: "--neutral-800", hex: "#333333" },
      { token: "neutral-900", varName: "--neutral-900", hex: "#1a1a1a" },
      { token: "black", varName: "--black", hex: "#000000" },
      { token: "white", varName: "--white", hex: "#ffffff" },
    ],
  },
  {
    title: "colors/signals",
    description: "Feedback and status color primitives",
    tokens: [
      { token: "default", varName: "--signal-default", hex: "#3b3b3b" },
      { token: "default-light", varName: "--signal-default-light", hex: "#d4d4d4" },
      { token: "warning", varName: "--signal-warning", hex: "#e15b02" },
      { token: "warning-light", varName: "--signal-warning-light", hex: "#ffdac2" },
      { token: "success", varName: "--signal-success", hex: "#0f8402" },
      { token: "success-light", varName: "--signal-success-light", hex: "#d4ffcf" },
      { token: "error", varName: "--signal-error", hex: "#bf0000" },
      { token: "error-light", varName: "--signal-error-light", hex: "#ffcece" },
    ],
  },
];

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function TokenRow({ token }: { token: ColorToken }): React.JSX.Element {
  const hsl = getCssVar(token.varName);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
      <div
        className="h-8 w-12 rounded-md border border-border/70"
        style={{ backgroundColor: token.hex }}
        aria-label={`${token.token} swatch`}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{token.token}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{token.varName}</p>
      </div>
      <div className="text-right">
        <p className="font-mono text-[11px] text-foreground">{token.hex}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{hsl || "(unavailable)"}</p>
      </div>
    </div>
  );
}

function ColorTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Color Primitives (v2)</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          전달한 primitives 시안 기준으로 color 토큰을 재정의했습니다. 컴포넌트 호환을 위해 semantic alias는 유지됩니다.
        </p>
      </div>

      {COLOR_GROUPS.map((group) => (
        <Card key={group.title} className="border-border/80 bg-card shadow-1">
          <CardHeader className="space-y-2 pb-3">
            <CardTitle className="text-lg">{group.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {group.tokens.map((token) => (
              <TokenRow key={`${group.title}-${token.token}`} token={token} />
            ))}
          </CardContent>
        </Card>
      ))}
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
