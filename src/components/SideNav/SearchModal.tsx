import type { SearchModalProps } from "@/types/sidenavProps";

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  inputRef,
}) => {
  if (!isOpen) return null;
  return (
    <section
      className="search-modal__backdrop"
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClose();
        }
      }}
    >
      <button
        className="search-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="search-modal__input"
          placeholder="Type to search..."
          autoFocus
        />
        <div className="search-modal__results">
          <p className="search-modal__placeholder">No results yet.</p>
        </div>
      </button>
    </section>
  );
};

export default SearchModal;
