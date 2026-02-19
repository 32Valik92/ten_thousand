import {useMemo, useState} from "react";
import type {DraftForm, DraftQuestion} from "./types";
import {QuestionType} from "../../../services/generated";

const uid = (): string =>
	`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const emptyQuestion = (): DraftQuestion => ({
	id: uid(),
	title: "",
	type: QuestionType.Text,
	required: false,
	options: [],
});

export const useFormBuilder = () => {

	const [form, setForm] = useState<DraftForm>({
		title: "",
		description: "",
		questions: [emptyQuestion()],
	});

	const canSave = useMemo(() => {
		return (form.title.trim().length > 0 && form.questions.every((q) => q.title.trim().length > 0));
	}, [form.title, form.questions]);

	const setTitle = (title: string) =>
		setForm((formItems) => ({...formItems, title}));

	const setDescription = (description: string) =>
		setForm((formItems) => ({...formItems, description}));

	const addQuestion = () =>
		setForm((formItems) => ({...formItems, questions: [...formItems.questions, emptyQuestion()]}));

	const removeQuestion = (id: string) =>
		setForm((formItems) => ({...formItems, questions: formItems.questions.filter((q) => q.id !== id)}));

	const updateQuestion = (id: string, patch: Partial<DraftQuestion>) =>
		setForm((formItems) => ({
			...formItems,
			questions: formItems.questions.map((q) => (q.id === id ? {...q, ...patch} : q)),
		}));

	const setQuestionType = (id: string, type: QuestionType) => {
		updateQuestion(id, {type, options: []});
	};

	const addOption = (questionId: string) =>
		setForm((formItems) => ({
			...formItems,
			questions: formItems.questions.map((q) =>
				q.id === questionId
					? {
						...q,
						options: [...q.options, {id: uid(), label: ""}],
					}
					: q
			),
		}));

	const updateOption = (questionId: string, optionId: string, label: string) =>
		setForm((formItems) => ({
			...formItems,
			questions: formItems.questions.map((q) =>
				q.id === questionId
					? {
						...q,
						options: q.options.map((o) =>
							o.id === optionId ? {...o, label} : o
						),
					}
					: q
			),
		}));

	const removeOption = (questionId: string, optionId: string) =>
		setForm((formItems) => ({
			...formItems,
			questions: formItems.questions.map((q) =>
				q.id === questionId
					? {...q, options: q.options.filter((o) => o.id !== optionId)}
					: q
			),
		}));

	return {
		form,
		canSave,
		setTitle,
		setDescription,
		addQuestion,
		removeQuestion,
		updateQuestion,
		setQuestionType,
		addOption,
		updateOption,
		removeOption,
	};
};
