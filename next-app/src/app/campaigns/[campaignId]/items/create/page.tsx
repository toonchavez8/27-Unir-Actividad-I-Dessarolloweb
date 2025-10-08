import { RoutePlaceholder } from "../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
	};
};

export default function CampaignNewItemPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Create Campaign Item"
			path="/campaigns/[campaignId]/items/create"
			description="Add an item that is restricted to a specific campaign."
			params={params}
		/>
	);
}
