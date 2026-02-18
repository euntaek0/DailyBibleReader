import type { Meta, StoryObj } from "@storybook/react-vite";

import { BoardRow } from "../../components/ui/board-row.tsx";

function BoardRowShowcase(): React.JSX.Element {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-[clamp(2.4rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">Board Row</h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          항목을 접거나 펼칠 수 있는 리스트 형태 컨테이너 컴포넌트입니다. 맥락을 벗어나지 않고 상세 내용을 빠르게 확인해야 할 때 사용합니다.
        </p>
      </div>

      <section className="space-y-4 border-t border-border/70 pt-6">
        <h3 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">Master Component</h3>

        <div className="rounded-2xl bg-muted/45 p-5">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <BoardRow
                title="질문을 적어주세요."
                leading={<span className="text-sm font-bold">Q</span>}
                collapsible
                defaultOpen={false}
              >
                <p className="text-sm leading-6 text-muted-foreground">답변은 텍스트 필드에 문구를 바로 입력하거나, 직접 제작한 프레임에 연결해서 커스텀할 수 있어요.</p>
              </BoardRow>
              <p className="text-center text-xs text-muted-foreground">Collapsed</p>
            </div>

            <div className="space-y-2">
              <BoardRow
                title="질문을 적어주세요."
                leading={<span className="text-sm font-bold">Q</span>}
                collapsible
                defaultOpen
              >
                <div className="space-y-2 text-sm leading-6 text-muted-foreground">
                  <p>답변은 텍스트 필드에 문구를 바로 입력하거나, 직접 제작한 프레임에 연결해서 커스텀할 수 있어요.</p>
                  <ul className="list-disc pl-5">
                    <li>불렛과 숫자 리스트도 쓸 수 있어요.</li>
                  </ul>
                </div>
              </BoardRow>
              <p className="text-center text-xs text-muted-foreground">Expanded</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">Child Item</h3>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="rounded-2xl bg-muted/45 p-5">
            <BoardRow
              title="질문을 적어주세요."
              leading={<span className="text-sm font-bold">Q</span>}
              collapsible
              defaultOpen
            >
              <div className="rounded-md border border-dashed border-brand-400/70 p-10 text-center text-sm text-muted-foreground">디스크립션 영역</div>
            </BoardRow>
          </div>

          <div className="text-sm leading-7 text-foreground">
            <p>• Option:</p>
            <p>a. Text: 디스크립션 영역은 Post &gt; Small 옵션을 사용합니다.</p>
            <p>b. Custom: 자유롭게 추가할 수 있습니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "UI/Board Row",
  component: BoardRow,
  tags: ["autodocs"],
  args: {
    title: "질문을 적어주세요.",
    leading: <span className="text-sm font-bold">Q</span>,
    collapsible: true,
    children: "여기에 상세 내용을 넣습니다.",
  },
} satisfies Meta<typeof BoardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Showcase: Story = {
  render: () => <BoardRowShowcase />,
};
