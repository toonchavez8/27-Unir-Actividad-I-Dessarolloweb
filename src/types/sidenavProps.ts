import type { RefObject } from "react";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}
