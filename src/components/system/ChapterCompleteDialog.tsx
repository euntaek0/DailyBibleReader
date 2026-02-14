import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.tsx";
import { Button } from "../ui/button.tsx";

interface ChapterCompleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onBack: () => void;
  onNextChapter?: () => void;
}

export function ChapterCompleteDialog({
  open,
  onOpenChange,
  title,
  description,
  onBack,
  onNextChapter,
}: ChapterCompleteDialogProps): React.JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="chapter-complete-desc" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription id="chapter-complete-desc">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onBack}>
            목록으로
          </Button>
          {onNextChapter ? (
            <Button onClick={onNextChapter} autoFocus>
              다음 장으로
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
