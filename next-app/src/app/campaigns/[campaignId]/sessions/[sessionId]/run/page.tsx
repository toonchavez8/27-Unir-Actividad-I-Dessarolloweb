import { RoutePlaceholder } from "../../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
		sessionId: string;
	};
};

export default function CampaignSessionRunnerPage({
	params,
}: Readonly<PageProps>) {
	return (
		<RoutePlaceholder
			title="Campaign Session Runner"
			path="/campaigns/[campaignId]/sessions/[sessionId]/run"
			description="Live tools for running a campaign session in real time."
			params={params}
		/>
	);
}
