import { RoutePlaceholder } from "../../../_components/route-placeholder";

type PageProps = {
	params: {
		sessionId: string;
	};
};

export default function SessionRunnerPage({ params }: PageProps) {
	return (
		<RoutePlaceholder
			title="Session Runner"
			path="/sessions/[sessionId]/run"
			description="Live session management interface for real-time play."
			params={params}
		/>
	);
}
