import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useFormQuery, useResponsesQuery } from "../services/generated";

export default function ResponsesPage() {
	const { id } = useParams<{ id: string }>();
	const formId = id ?? "";

	const formQ = useFormQuery({ id: formId }, { skip: !formId });
	const respQ = useResponsesQuery({ formId }, { skip: !formId });

	const form = formQ.data?.form ?? null;
	const responses = respQ.data?.responses ?? [];

	const questionMap = useMemo(() => {
		const m = new Map<string, { title: string; opt: Map<string, string> }>();

		for (const q of form?.questions ?? []) {
			const opt = new Map<string, string>();

			for (const o of q.options ?? []) {
				opt.set(o.id, o.label);
			}

			m.set(q.id, { title: q.title, opt });
		}

		return m;
	}, [form]);

	if (formQ.isLoading || respQ.isLoading)
		return <div className="rounded-xl border bg-white p-4">Loading…</div>;

	if (formQ.error || respQ.error || !form)
		return (
			<div className="rounded-xl border bg-white p-4 text-red-600">Error</div>
		);

	return (
		<div className="space-y-4">
			<div className="rounded-xl border bg-white p-6">
				<h1 className="text-xl font-bold">Responses: {form.title}</h1>

				<div className="text-sm text-slate-600">Total: {responses.length}</div>
			</div>

			{responses.length === 0 && (
				<div className="rounded-xl border bg-white p-4 text-slate-600">
					No responses yet.
				</div>
			)}

			{responses.map((r) => (
				<div key={r.id} className="rounded-xl border bg-white p-4 space-y-3">
					<div className="flex items-center justify-between">
						<div className="font-semibold">Response</div>

						<div className="text-xs text-slate-500">
							{new Date(r.createdAt).toLocaleString()}
						</div>
					</div>

					{(r.answers ?? []).map((a) => {
						const q = questionMap.get(a.questionId);
						const title = q?.title ?? `Unknown question (${a.questionId})`;

						let value = "(empty)";

						if (a.textValue) value = a.textValue;
						else if (a.dateValue) value = a.dateValue;
						else if (a.optionId) value = q?.opt.get(a.optionId) ?? a.optionId;
						else if (a.optionIds?.length)
							value = a.optionIds
								.map((id) => q?.opt.get(id) ?? id)
								.join(", ");

						return (
							<div key={a.questionId} className="border-t pt-3">
								<div className="text-sm font-medium">{title}</div>
								<div className="text-sm text-slate-700">{value}</div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
