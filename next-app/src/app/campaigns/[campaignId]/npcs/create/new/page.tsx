import { RoutePlaceholder } from "../../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
	};
};

export default function CampaignNewNpcPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Create Campaign NPC"
			path="/campaigns/[campaignId]/npcs/create/new"
			description="Add a new NPC scoped to the selected campaign."
			params={params}
		/>
	);
}
