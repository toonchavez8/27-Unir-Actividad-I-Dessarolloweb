import { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Editor, {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  Toolbar,
} from "react-simple-wysiwyg";
import type { Campaign } from "@/types/campaigns";

export interface CampaignNotesEditorProps {
  readonly campaign: Campaign;
  readonly onNotesUpdate?: (updatedCampaign: Campaign) => void;
}

export function CampaignNotesEditor({
  campaign,
  onNotesUpdate,
}: CampaignNotesEditorProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesContent, setNotesContent] = useState("");
  const [originalNotes, setOriginalNotes] = useState("");

  // Load campaign notes when component mounts or campaign changes
  useEffect(() => {
    if (campaign) {
      const notes = campaign.notes || "";
      setNotesContent(notes);
      setOriginalNotes(notes);
    }
  }, [campaign]);

  // Save notes to session storage and update campaign
  const saveNotes = () => {
    if (!campaign) return;

    // Update the campaign object
    const updatedCampaign = {
      ...campaign,
      notes: notesContent,
      updatedAt: new Date(),
    };

    // Get existing campaigns from session storage
    const existingCampaigns = JSON.parse(
      sessionStorage.getItem("campaigns") || "[]",
    );

    // Update the specific campaign
    const updatedCampaigns = existingCampaigns.map((c: typeof campaign) =>
      c.id === campaign.id ? updatedCampaign : c,
    );

    // Save back to session storage
    sessionStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

    // Call the callback if provided
    if (onNotesUpdate) {
      onNotesUpdate(updatedCampaign);
    }

    // Exit edit mode
    setIsEditingNotes(false);
    setOriginalNotes(notesContent);
  };

  // Cancel editing and restore original notes
  const cancelEdit = () => {
    setNotesContent(originalNotes);
    setIsEditingNotes(false);
  };

  // Handle notes content change
  const handleNotesChange = (e: { target: { value: string } }) => {
    setNotesContent(e.target.value);
  };

  return (
    <section className="campaign-detail__section anim">
      <div className="campaign-detail__section-header anim">
        <h2 className="campaign-detail__section-title">Campaign Notes</h2>
        {!isEditingNotes ? (
          <button
            className="campaign-detail__edit-btn"
            onClick={() => setIsEditingNotes(true)}
            aria-label="Edit campaign notes"
          >
            <FaEdit />
            Edit Notes
          </button>
        ) : (
          <div className="campaign-detail__edit-actions">
            <button
              className="campaign-detail__save-btn"
              onClick={saveNotes}
              aria-label="Save campaign notes"
            >
              <FaSave />
              Save
            </button>
            <button
              className="campaign-detail__cancel-btn"
              onClick={cancelEdit}
              aria-label="Cancel editing"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="campaign-detail__notes">
        {!isEditingNotes ? (
          <div
            className="campaign-detail__notes-content"
            dangerouslySetInnerHTML={{
              __html:
                notesContent ||
                '<p>No notes yet. Click "Edit Notes" to add some!</p>',
            }}
          />
        ) : (
          <div className="campaign-detail__notes-editor">
            <Editor
              value={notesContent}
              onChange={handleNotesChange}
              containerProps={{
                style: {
                  minHeight: "200px",
                  resize: "vertical",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--card-background)",
                },
              }}
            >
              <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <BtnNumberedList />
                <BtnBulletList />
                <BtnLink />
                <BtnClearFormatting />
              </Toolbar>
            </Editor>
          </div>
        )}
      </div>
    </section>
  );
}
