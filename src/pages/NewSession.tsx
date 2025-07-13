import { useParams } from "react-router";
import { SessionForm } from "@/components/forms";

export function NewSession() {
  const { campaignId } = useParams<{ campaignId: string }>();
  
  return <SessionForm campaignId={campaignId} />;
}

export default NewSession;
