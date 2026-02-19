import { Link } from "react-router-dom";

import { useFormsQuery } from "../services/generated";

export default function HomePage() {

	const { data, isLoading, error, refetch } = useFormsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold">Forms</h1>
				<button
					onClick={() => refetch()}
					className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50"
				>
					Refresh
				</button>
			</div>

			{isLoading && (
				<div className="rounded-xl border bg-white p-4">
					Loading…
				</div>
			)}

			{error && (
				<div className="rounded-xl border bg-white p-4 text-red-600">
					Error loading forms
				</div>
			)}

			{(data?.forms ?? []).map((form) => (
				<div key={form.id} className="rounded-xl border bg-white p-4">

					<div className="flex items-start justify-between gap-3">
						<div>
							<div className="font-semibold">
								{form.title}
							</div>

							{form.description && (
								<div className="text-sm text-slate-600">
									{form.description}
								</div>
							)}

							<div className="mt-1 text-xs text-slate-500">
								{new Date(form.createdAt).toLocaleString()}
							</div>
						</div>

						<div className="flex gap-2">
							<Link
								className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
								to={`/forms/${form.id}/fill`}
							>
								View
							</Link>

							<Link
								className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
								to={`/forms/${form.id}/responses`}
							>
								Responses
							</Link>

						</div>
					</div>
				</div>
			))}

			{!isLoading && !error && (data?.forms?.length ?? 0) === 0 && (
				<div className="rounded-xl border bg-white p-4 text-slate-600">
					No forms yet. Create one.
				</div>
			)}

		</div>
	);
}
