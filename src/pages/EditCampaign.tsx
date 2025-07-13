import { useParams } from "react-router";
import { CampaignForm } from "@/components/forms";

export function EditCampaign() {
  const { campaignId } = useParams<{ campaignId: string }>();

  return <CampaignForm campaignId={campaignId} />;
}

export default EditCampaign;
