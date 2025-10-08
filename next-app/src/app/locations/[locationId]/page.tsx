import { RoutePlaceholder } from "../../_components/route-placeholder";

type PageProps = {
	params: {
		locationId: string;
	};
};

export default function LocationDetailPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Location Detail"
			path="/locations/[locationId]"
			description="Detail page for a single location including history and encounter ideas."
			params={params}
		/>
	);
}
