import { RoutePlaceholder } from "../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
	};
};

export default function EditCampaignPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Edit Campaign"
			path="/campaigns/[campaignId]/edit"
			description="Update campaign metadata, notes, and linked entities."
			params={params}
		/>
	);
}
