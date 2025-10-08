import Link from "next/link";

type NavLink = {
	readonly label: string;
	readonly href: string;
};

type RoutePlaceholderProps = {
	readonly title: string;
	readonly path: string;
	readonly description?: string;
	readonly params?: Record<string, string | string[]>;
	readonly links?: readonly NavLink[];
};

const defaultLinks: readonly NavLink[] = [
	{ label: "Home", href: "/" },
	{ label: "Campaigns", href: "/campaigns" },
	{ label: "Sessions", href: "/sessions" },
	{ label: "NPCs", href: "/npcs" },
	{ label: "Shops", href: "/shops" },
	{ label: "Locations", href: "/locations" },
	{ label: "Items", href: "/items" },
];

export function RoutePlaceholder({
	title,
	path,
	description = "Replace this template with the actual implementation.",
	params,
	links = defaultLinks,
}: RoutePlaceholderProps) {
	const hasParams = params && Object.keys(params).length > 0;
	const hasLinks = links.length > 0;

	return (
		<main className="flex min-h-[60vh] flex-col gap-8 p-8">
			<header className="space-y-2">
				<p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
					Route template
				</p>
				<h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
					{title}
				</h1>
				<p className="text-base text-neutral-600 dark:text-neutral-300">
					{path}
				</p>
			</header>

			<section className="max-w-3xl space-y-4 text-neutral-700 dark:text-neutral-200">
				<p>{description}</p>
				{hasParams ? (
					<div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4 font-mono text-sm dark:border-neutral-700 dark:bg-neutral-900/40">
						<p className="mb-2 font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
							Dynamic params
						</p>
						<pre className="overflow-auto text-xs sm:text-sm">
							{JSON.stringify(params, null, 2)}
						</pre>
					</div>
				) : null}
			</section>

			{hasLinks ? (
				<section className="space-y-3">
					<p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
						Quick navigation
					</p>
					<div className="flex flex-wrap gap-3">
						{links.map(({ label, href }) => (
							<Link
								key={`${label}-${href}`}
								href={href}
								className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
							>
								{label}
							</Link>
						))}
					</div>
				</section>
			) : null}
		</main>
	);
}
