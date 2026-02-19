export type QuestionType =
	| "TEXT"
	| "MULTIPLE_CHOICE"
	| "CHECKBOX"
	| "DATE";

export type Option = {
	id: string;
	label: string;
};

export type Question = {
	id: string;
	title: string;
	type: QuestionType;
	required: boolean;
	options?: Option[];
};

export type Form = {
	id: string;
	title: string;

	description?: string | null;
	questions: Question[];
	createdAt: string;
};

export type Answer = {
	questionId: string;
	textValue?: string | null;
	dateValue?: string | null;
	optionId?: string | null;
	optionIds?: string[] | null;
};

export type Response = {
	id: string;
	formId: string;
	answers: Answer[];
	createdAt: string;
};

export type OptionInput = {
	label: string;
};

export type QuestionInput = {
	title: string;
	type: QuestionType;
	required: boolean;
	options?: OptionInput[] | null;
};

export type AnswerInput = {
	questionId: string;

	textValue?: string | null;
	dateValue?: string | null;
	optionId?: string | null;
	optionIds?: string[] | null;
};
