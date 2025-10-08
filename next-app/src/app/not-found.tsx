import { RoutePlaceholder } from "./_components/route-placeholder";

export default function NotFound() {
	return (
		<RoutePlaceholder
			title="Not Found"
			path="*"
			description="Fallback page for unknown routes."
		/>
	);
}
