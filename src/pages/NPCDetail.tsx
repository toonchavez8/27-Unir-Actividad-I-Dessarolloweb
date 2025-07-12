import { useParams, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { NPCForm } from "@/components/forms/NPCForm";
import { useCampaigns } from "@/hooks/useCampaigns";
import "@/css/NPCDetail.css";

export function NPCDetail() {
  const { npcId, campaignId } = useParams<{ npcId: string; campaignId?: string }>();
  const navigate = useNavigate();
  const { getNPCById, loading } = useCampaigns();

  // Check if NPC exists
  const npc = npcId ? getNPCById(npcId) : null;

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="page-container">
        <div className="npc-detail__loading">
          <div className="npc-detail__loading-header">
            <div className="npc-detail__loading-title"></div>
            <div className="npc-detail__loading-description"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if NPC is not found
  if (npcId && !npc) {
    return (
      <div className="page-container">
        <div className="npc-detail__error">
          <button
            className="npc-detail__back-button"
            onClick={() => navigate("/npcs")}
            type="button"
          >
            <FaArrowLeft className="npc-detail__back-icon" />
            Back to NPCs
          </button>
          
          <div className="npc-detail__error-content">
            <h1 className="npc-detail__error-title">NPC Not Found</h1>
            <p className="npc-detail__error-message">
              The NPC you're looking for doesn't exist or has been removed.
            </p>
            <button 
              className="npc-detail__error-button"
              onClick={() => navigate("/npcs")}
            >
              Back to NPCs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <NPCForm npcId={npcId} campaignId={campaignId} />;
}

export default NPCDetail;
