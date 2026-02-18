import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { Button } from "../../components/ui/button.tsx";
import { cn } from "../../lib/utils.ts";

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>["variant"]>;
type ButtonSize = NonNullable<React.ComponentProps<typeof Button>["size"]>;

type ColorGroup = {
  title: string;
  fillVariant: ButtonVariant;
  weakVariant: ButtonVariant;
  surfaceClassName?: string;
  onSurfaceTextClassName?: string;
};

type StateRow = {
  disabled: boolean;
  stateLabel: string;
  loading: boolean;
  pressed: boolean;
};

const SIZE_COLUMNS: Array<{ label: string; value: ButtonSize }> = [
  { label: "S", value: "sm" },
  { label: "M", value: "md" },
  { label: "L", value: "lg" },
  { label: "XL", value: "xl" },
];

const COLOR_GROUPS: ColorGroup[] = [
  { title: "Primary", fillVariant: "primary", weakVariant: "primaryWeak" },
  { title: "Secondary", fillVariant: "secondary", weakVariant: "secondaryWeak" },
  { title: "Danger", fillVariant: "danger", weakVariant: "dangerWeak" },
  {
    title: "Primary Inverse",
    fillVariant: "primaryInverse",
    weakVariant: "primaryInverseWeak",
    surfaceClassName: "bg-brand-500",
    onSurfaceTextClassName: "text-white/85",
  },
];

const STATE_ROWS: StateRow[] = [
  { disabled: false, stateLabel: "Default", loading: false, pressed: false },
  { disabled: false, stateLabel: "Pressed", loading: false, pressed: true },
  { disabled: true, stateLabel: "Default", loading: false, pressed: false },
  { disabled: false, stateLabel: "Loading", loading: true, pressed: false },
  { disabled: true, stateLabel: "Loading", loading: true, pressed: false },
];

const LABEL_COLUMN_CLASS = "w-[96px] whitespace-nowrap text-[12px] font-medium";
const SIZE_GRID_CLASS = "grid grid-cols-4 gap-5";
const MATRIX_LAYOUT_CLASS = "grid grid-cols-[96px_96px_84px_1fr] items-center gap-6";
const MATRIX_MIN_WIDTH_CLASS = "min-w-[1040px]";

function MatrixRow({
  row,
  variantLabel,
  variant,
  textClassName,
}: {
  row: StateRow;
  variantLabel: "Fill" | "Weak";
  variant: ButtonVariant;
  textClassName?: string;
}): React.JSX.Element {
  return (
    <div className={cn(MATRIX_LAYOUT_CLASS, "py-0.5")}>
      <p className={cn(LABEL_COLUMN_CLASS, textClassName)}>{variantLabel === "Fill" ? String(row.disabled) : ""}</p>
      <p className={cn(LABEL_COLUMN_CLASS, textClassName)}>{variantLabel === "Fill" ? row.stateLabel : ""}</p>
      <p className={cn("text-[12px] font-medium", textClassName)}>{variantLabel}</p>
      <div className={SIZE_GRID_CLASS}>
        {SIZE_COLUMNS.map((sizeCol) => (
          <Button
            key={`${variant}-${variantLabel}-${row.stateLabel}-${String(row.disabled)}-${sizeCol.value}`}
            variant={variant}
            size={sizeCol.value}
            loading={row.loading}
            disabled={row.disabled}
            pressed={row.pressed}
            className="w-full"
          >
            버튼
          </Button>
        ))}
      </div>
    </div>
  );
}

function MatrixBlock({ group }: { group: ColorGroup }): React.JSX.Element {
  return (
    <Card className={cn("overflow-hidden border-border/80 shadow-1", group.surfaceClassName ?? "bg-card")}>
      <CardHeader className="space-y-3 pb-1">
        <CardTitle className={cn("text-base", group.onSurfaceTextClassName)}>{group.title}</CardTitle>
      </CardHeader>

      <CardContent className="pb-5 pt-2">
        <div className="overflow-x-auto pb-1">
          <div className={cn(MATRIX_MIN_WIDTH_CLASS, "space-y-4")}>
            <div className={cn(MATRIX_LAYOUT_CLASS, "border-b border-border/65 pb-2")}>
              <p className={cn(LABEL_COLUMN_CLASS, group.onSurfaceTextClassName)}>Disabled</p>
              <p className={cn(LABEL_COLUMN_CLASS, group.onSurfaceTextClassName)}>States</p>
              <p className={cn("text-[12px] font-medium", group.onSurfaceTextClassName)}>Variant</p>
              <div className={SIZE_GRID_CLASS}>
                {SIZE_COLUMNS.map((sizeCol) => (
                  <p key={`${group.title}-${sizeCol.value}`} className={cn("text-center text-[12px] font-medium", group.onSurfaceTextClassName)}>
                    {sizeCol.label}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {STATE_ROWS.flatMap((row) => [
                <MatrixRow
                  key={`${group.title}-${row.stateLabel}-${String(row.disabled)}-fill`}
                  row={row}
                  variantLabel="Fill"
                  variant={group.fillVariant}
                  textClassName={group.onSurfaceTextClassName}
                />,
                <MatrixRow
                  key={`${group.title}-${row.stateLabel}-${String(row.disabled)}-weak`}
                  row={row}
                  variantLabel="Weak"
                  variant={group.weakVariant}
                  textClassName={group.onSurfaceTextClassName}
                />,
              ])}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ButtonMatrixStory(): React.JSX.Element {
  return (
    <div className="space-y-5 p-6">
      <div className="space-y-2">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">Button System v2</h2>
        <p className="text-sm leading-[1.5] text-muted-foreground">
          색상군(Primary/Secondary/Danger/Primary Inverse), Fill/Weak, 상태(Default/Pressed/Disabled/Loading), 사이즈(S~XL)를
          한 번에 검증할 수 있는 매트릭스입니다.
        </p>
      </div>

      <div className="grid gap-4">
        {COLOR_GROUPS.map((group) => (
          <MatrixBlock key={group.title} group={group} />
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    frame: "wide",
  },
  args: {
    children: "버튼",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => <ButtonMatrixStory />,
};
