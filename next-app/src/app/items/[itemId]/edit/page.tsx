import { RoutePlaceholder } from "../../../_components/route-placeholder";

type PageProps = {
	params: {
		itemId: string;
	};
};

export default function EditItemPage({ params }: Readonly<PageProps>) {
	return (
		<RoutePlaceholder
			title="Edit Item"
			path="/items/[itemId]/edit"
			description="Adjust stats, properties, or availability of an existing item."
			params={params}
		/>
	);
}
