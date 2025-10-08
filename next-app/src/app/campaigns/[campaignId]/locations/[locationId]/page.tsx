import { RoutePlaceholder } from "../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
		locationId: string;
	};
};

export default function CampaignLocationDetailPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Campaign Location Detail"
			path="/campaigns/[campaignId]/locations/[locationId]"
			description="Campaign-specific notes and encounters for a location."
			params={params}
		/>
	);
}
