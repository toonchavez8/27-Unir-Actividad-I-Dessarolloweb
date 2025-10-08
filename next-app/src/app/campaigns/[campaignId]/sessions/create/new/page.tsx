import { RoutePlaceholder } from "../../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
	};
};

export default function CampaignNewSessionPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Create Campaign Session"
			path="/campaigns/[campaignId]/sessions/create/new"
			description="Setup flow for adding a session tied to a particular campaign."
			params={params}
		/>
	);
}
