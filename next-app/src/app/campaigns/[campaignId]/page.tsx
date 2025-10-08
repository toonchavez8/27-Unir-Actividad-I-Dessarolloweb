import { RoutePlaceholder } from "../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
	};
};

export default function CampaignDetailPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Campaign Detail"
			path="/campaigns/[campaignId]"
			description="Detailed view of a single campaign including summary, stats, and linked resources."
			params={params}
		/>
	);
}
