import { RoutePlaceholder } from "../../_components/route-placeholder";

type PageProps = {
	params: {
		shopId: string;
	};
};

export default function ShopDetailPage({ params }: Readonly<PageProps>) {
	return (
		<RoutePlaceholder
			title="Shop Detail"
			path="/shops/[shopId]"
			description="Detailed record for a specific shop, including inventory and NPC owners."
			params={params}
		/>
	);
}
