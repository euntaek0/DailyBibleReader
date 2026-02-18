import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";

function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function EffectSwatch({
  title,
  description,
  shadowClass,
  varName,
  surfaceClassName = "bg-card",
  borderClassName = "border border-border/80",
}: {
  title: string;
  description: string;
  shadowClass: string;
  varName: string;
  surfaceClassName?: string;
  borderClassName?: string;
}): React.JSX.Element {
  const value = getCssVar(varName);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/65 p-3">
      <div className={`h-14 w-14 rounded-xl ${borderClassName} ${surfaceClassName} ${shadowClass}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="font-mono text-[11px] text-muted-foreground">{shadowClass}</p>
        </div>
        <p className="pt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        <p className="pt-2 font-mono text-[11px] leading-4 text-muted-foreground">
          {varName}: {value || "(unavailable)"}
        </p>
      </div>
    </div>
  );
}

function EffectTokensStory(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Effect Tokens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Elevation/Sunken/Glow 등 효과 토큰입니다. 사진에 나온 “diffusion” 스타일도 같이 추가했습니다.
        </p>
      </div>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Elevation (E0-E3)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tailwind: <span className="font-mono text-[0.85em]">shadow-e0|e1|e2|e3</span>
          </p>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <EffectSwatch title="E0" description="Flat: 그림자 없음" shadowClass="shadow-e0" varName="--shadow-e0" />
          <EffectSwatch title="E1" description="Subtle: 카드/컨트롤의 기본 분리감" shadowClass="shadow-e1" varName="--shadow-e1" />
          <EffectSwatch title="E2" description="Raised: 모달/도크/중요 섹션" shadowClass="shadow-e2" varName="--shadow-e2" />
          <EffectSwatch title="E3" description="Overlay: 최상위 레이어" shadowClass="shadow-e3" varName="--shadow-e3" />
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Diffusion</CardTitle>
          <p className="text-sm text-muted-foreground">흐림/확산 느낌의 쉐도우 프리셋입니다.</p>
        </CardHeader>
        <CardContent className="grid gap-3">
          <EffectSwatch
            title="Soft Diffusion"
            description="부드럽고 넓게 퍼지는 확산. 차분한 강조에 사용."
            shadowClass="shadow-soft"
            varName="--shadow-soft-diffusion"
          />
          <EffectSwatch
            title="Strong Diffusion"
            description="조금 더 또렷한 확산. 정보 카드/CTA 강조에 사용."
            shadowClass="shadow-strong"
            varName="--shadow-strong-diffusion"
          />
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card shadow-1">
        <CardHeader className="space-y-2 pb-3">
          <CardTitle className="text-lg">Sunken / Glow / Neo</CardTitle>
          <p className="text-sm text-muted-foreground">특수 효과 토큰입니다. 남발하지 않고 “상태/강조”에만 제한적으로 사용합니다.</p>
        </CardHeader>
        <CardContent className="grid gap-3">
          <EffectSwatch
            title="Sunken"
            description="Inset 그림자. 입력 영역/눌림 상태/분리감에 사용."
            shadowClass="shadow-sunken"
            varName="--shadow-sunken"
            surfaceClassName="bg-background"
          />
          <EffectSwatch
            title="Glow (Primary)"
            description="Primary 기반 글로우. 활성/포커스/성공 상태에 사용."
            shadowClass="shadow-glow"
            varName="--shadow-glow-primary"
          />
          <EffectSwatch
            title="Glow (Secondary)"
            description="Secondary 기반 글로우. 보조 강조에 사용."
            shadowClass="shadow-glow-secondary"
            varName="--shadow-glow-secondary"
          />
          <EffectSwatch
            title="Neobrutalism"
            description="하드 쉐도우. 강한 섹션 구분 또는 특별한 카드에만."
            shadowClass="shadow-brutal"
            varName="--shadow-neobrutal"
            borderClassName="border-heavy border-foreground/90"
            surfaceClassName="bg-card"
          />
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: "Foundation/Effect Tokens",
  render: () => <EffectTokensStory />,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

