import { useParams } from "react-router";
import { SessionForm } from "@/components/forms";

export function EditSession() {
  const { sessionId, campaignId } = useParams<{ sessionId: string; campaignId: string }>();
  
  return <SessionForm sessionId={sessionId} campaignId={campaignId} />;
}

export default EditSession;
