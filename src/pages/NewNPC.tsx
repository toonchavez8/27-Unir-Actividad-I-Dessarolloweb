import { useParams } from "react-router";
import { NPCForm } from "@/components/forms/NPCForm";

export function NewNPC() {
  const { campaignId } = useParams<{ campaignId?: string }>();

  return <NPCForm campaignId={campaignId} />;
}

export default NewNPC;
