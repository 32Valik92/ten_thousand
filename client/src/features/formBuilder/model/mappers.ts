import type {QuestionInput} from "../../../services/generated";
import type {DraftQuestion} from "./types";

export const draftQuestionToInput = (question: DraftQuestion): QuestionInput => {
	const base: QuestionInput = {
		title: question.title,
		type: question.type,
		required: question.required,
	};

	if (question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX") {

		const options = question.options.map((option) => option.label.trim())
			.filter((option) => option.length > 0)
			.map((label) => ({label}));

		return {...base, options};
	}

	return base;
};
