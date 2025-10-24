import { RoutePlaceholder } from "../../../../../_components/route-placeholder";

type PageProps = {
	params: {
		campaignId: string;
	};
};

export default function CampaignNewShopPage({ params }: Readonly<PageProps>) {
	return (
		<RoutePlaceholder
			title="Create Campaign Shop"
			path="/campaigns/[campaignId]/shops/create/new"
			description="Create a shop that is associated with the current campaign."
			params={params}
		/>
	);
}
