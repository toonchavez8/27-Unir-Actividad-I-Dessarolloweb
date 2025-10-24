import { RoutePlaceholder } from "../../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
		sessionId: string;
	};
};

export default function EditCampaignSessionPage({
	params,
}: Readonly<PageProps>) {
	return (
		<RoutePlaceholder
			title="Edit Campaign Session"
			path="/campaigns/[campaignId]/sessions/[sessionId]/edit"
			description="Modify metadata, encounters, and notes for a scheduled session."
			params={params}
		/>
	);
}
