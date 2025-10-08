import { RoutePlaceholder } from "../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
		sessionId: string;
	};
};

export default function CampaignSessionDetailPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Campaign Session Detail"
			path="/campaigns/[campaignId]/sessions/[sessionId]"
			description="Full detail view for a campaign session including logs and encounters."
			params={params}
		/>
	);
}
