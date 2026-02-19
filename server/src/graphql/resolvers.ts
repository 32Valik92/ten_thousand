import { forms, responses, createId, now } from "../store/store";

import type {
	AnswerInput,
	Form,
	Question,
	QuestionInput,
	Response as FormResponse,
} from "../types";

type CreateFormArgs = {
	title: string;
	description?: string | null;
	questions?: QuestionInput[] | null;
};

type SubmitResponseArgs = {
	formId: string;
	answers: AnswerInput[];
};

export const resolvers = {

	Query: {
		forms: (): Form[] => Array.from(forms.values()),

		form: (_: unknown, args: { id: string }): Form | null =>
			forms.get(args.id) ?? null,

		responses: (_: unknown, args: { formId: string }): FormResponse[] =>
			responses.get(args.formId) ?? [],
	},

	Mutation: {

		createForm: (_: unknown, args: CreateFormArgs): Form => {

			const formId = createId();

			const questions: Question[] = (args.questions ?? []).map((q) => ({

				id: createId(),
				title: q.title,
				type: q.type,
				required: q.required,
				options:
					q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX"
						? (q.options ?? []).map((o) => ({
							id: createId(),
							label: o.label,
						}))
						: undefined,
			}));


			const form: Form = {
				id: formId,
				title: args.title,
				description: args.description ?? null,
				createdAt: now(),
				questions,
			};

			forms.set(formId, form);

			return form;
		},


		submitResponse: (_: unknown, args: SubmitResponseArgs): FormResponse => {

			const form = forms.get(args.formId);
			if (!form) throw new Error(`Form not found (id=${args.formId})`);


			const response: FormResponse = {
				id: createId(),
				formId: args.formId,
				createdAt: now(),

				answers: args.answers.map((a) => ({
					questionId: a.questionId,
					textValue: a.textValue ?? null,
					dateValue: a.dateValue ?? null,
					optionId: a.optionId ?? null,
					optionIds: a.optionIds ?? null,
				})),
			};

			const existing = responses.get(args.formId) ?? [];

			responses.set(args.formId, [...existing, response]);

			return response;
		},
	},
} satisfies Record<string, unknown>;
