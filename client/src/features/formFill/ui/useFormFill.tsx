import {useMemo, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";

import {
	QuestionType,
	useFormQuery,
	useSubmitResponseMutation,
} from "../../../services/generated";

import type {AnswerInput} from "../../../services/generated";

import {useFormFill, validateRequired} from "../model/useFormFill";

export default function FormFill() {
	const navigate = useNavigate();
	const [validationError, setValidationError] = useState<string | null>(null);
	const {id} = useParams<{ id: string }>();
	const formId = id ?? "";

	const {data, isLoading, error} = useFormQuery(
		{id: formId},
		{skip: !formId}
	);

	const [submit, submitState] = useSubmitResponseMutation();
	const {values, patch} = useFormFill();

	const form = data?.form ?? null;

	const answers = useMemo<AnswerInput[]>(() => {
		if (!form) return [];

		return form.questions.map((question) => {
			const value = values[question.id] ?? {};

			const base: AnswerInput = {questionId: question.id};

			switch (question.type) {
				case QuestionType.Text:
					return {...base, textValue: value.text ?? null};

				case QuestionType.Date:
					return {...base, dateValue: value.date ?? null};

				case QuestionType.MultipleChoice:
					return {...base, optionId: value.optionId ?? null};

				case QuestionType.Checkbox:
					return {...base, optionIds: value.optionIds ?? []};

				default: {
					const _exhaustive: never = question.type;
					return _exhaustive;
				}
			}
		});
	}, [form, values]);

	const onSubmit = async (): Promise<void> => {
		if (!form) return;

		const requiredIds = form.questions
			.filter((question) => question.required)
			.map((question) => question.id);

		const missing = validateRequired(requiredIds, values);

		if (missing.length) {
			setValidationError("Please fill all required fields");
			return;
		}

		setValidationError(null);

		await submit({formId: form.id, answers}).unwrap();

		navigate("/");
	};

	if (isLoading)
		return <div className="rounded-xl border bg-white p-4">Loading…</div>;

	if (error || !form)
		return (
			<div className="rounded-xl border bg-white p-4 text-red-600">Error</div>
		);

	return (
		<div className="space-y-4">
			<div className="rounded-xl border bg-white p-6">
				<h1 className="text-xl font-bold">{form.title}</h1>
				{form.description && (
					<div className="mt-1 text-slate-600">{form.description}</div>
				)}
			</div>

			{form.questions.map((question) => {
				const value = values[question.id] ?? {};

				return (
					<div key={question.id} className="rounded-xl border bg-white p-4 space-y-3">
						<div className="flex items-center justify-between">
							<div className="font-semibold">{question.title}</div>
							{question.required && (
								<div className="text-xs text-slate-500">required</div>
							)}
						</div>

						{question.type === "TEXT" && (
							<input
								className="w-full rounded-lg border px-3 py-2"
								value={value.text ?? ""}
								onChange={(e) => patch(question.id, {text: e.target.value})}
							/>
						)}

						{question.type === "DATE" && (
							<input
								className="w-full rounded-lg border px-3 py-2"
								type="date"
								value={value.date ?? ""}
								onChange={(e) => patch(question.id, {date: e.target.value})}
							/>
						)}

						{question.type === "MULTIPLE_CHOICE" && (
							<div className="space-y-2">
								{(question.options ?? []).map((o) => (
									<label key={o.id} className="flex items-center gap-2 text-sm">
										<input
											type="radio"
											name={question.id}
											checked={(value.optionId ?? "") === o.id}
											onChange={() => patch(question.id, {optionId: o.id})}
										/>
										{o.label}
									</label>
								))}
							</div>
						)}

						{question.type === "CHECKBOX" && (
							<div className="space-y-2">
								{(question.options ?? []).map((o) => {
									const arr = value.optionIds ?? [];

									const checked = arr.includes(o.id);

									return (
										<label key={o.id} className="flex items-center gap-2 text-sm">
											<input
												type="checkbox"
												checked={checked}
												onChange={() => {
													const next = checked
														? arr.filter((x) => x !== o.id)
														: [...arr, o.id];

													patch(question.id, {optionIds: next});
												}}
											/>
											{o.label}
										</label>
									);
								})}
							</div>
						)}
					</div>
				);
			})}

			<div className="rounded-xl border bg-white p-4 flex items-center gap-3">
				<button
					onClick={onSubmit}
					disabled={submitState.isLoading}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
				>
					{submitState.isLoading ? "Submitting..." : "Submit"}
				</button>

				{validationError && (
					<div className="text-sm text-red-600">{validationError}</div>
				)}

				{submitState.error && (
					<div className="text-sm text-red-600">Submit failed</div>
				)}

				{submitState.isSuccess && (
					<div className="text-sm text-green-700">Submitted!</div>
				)}
			</div>
		</div>
	);
}
