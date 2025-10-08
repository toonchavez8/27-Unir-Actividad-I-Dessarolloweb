import { RoutePlaceholder } from "../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
		npcId: string;
	};
};

export default function CampaignNpcDetailPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Campaign NPC Detail"
			path="/campaigns/[campaignId]/npcs/[npcId]"
			description="Detail view for a campaign-specific NPC."
			params={params}
		/>
	);
}
