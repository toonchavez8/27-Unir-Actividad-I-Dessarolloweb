import { RoutePlaceholder } from "../../_components/route-placeholder";

type PageProps = {
	params: {
		itemId: string;
	};
};

export default function ItemDetailPage({ params }: Readonly<PageProps>) {
	return (
		<RoutePlaceholder
			title="Item Detail"
			path="/items/[itemId]"
			description="View the full details for a specific item."
			params={params}
		/>
	);
}
