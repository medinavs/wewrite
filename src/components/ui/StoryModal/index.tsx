import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import {
  CloseButton,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Editor,
  HeaderContainer,
} from "./styles";
import { useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

interface StoryModalProps {
  children: React.ReactNode;
  content: string;
  author: string;
}

export function StoryModal({ children, content, author }: StoryModalProps) {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: content,
    editable: false,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <HeaderContainer>
            <DialogTitle>{author}</DialogTitle>
            <DialogClose asChild>
              <CloseButton aria-label="Close">
                <X />
              </CloseButton>
            </DialogClose>
          </HeaderContainer>
          <DialogDescription>
            <Editor editor={editor} />
          </DialogDescription>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
