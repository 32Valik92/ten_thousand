import {useNavigate} from "react-router-dom";
import {useCreateFormMutation} from "../../../services/generated";
import {useFormBuilder} from "../model/useFormBuilder";
import {draftQuestionToInput} from "../model/mappers";
import QuestionCard from "./QuestionCard";

import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

export default function FormBuilder() {
	const navigate = useNavigate();

	const [createForm, {isLoading, error}] = useCreateFormMutation();

	const {
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
	} = useFormBuilder();

	const onSave = async (): Promise<void> => {
		if (!canSave) return;

		const questions = form.questions
			.filter((question) => question.title.trim().length > 0)
			.map(question => draftQuestionToInput(question));

		const res = await createForm({
			title: form.title.trim(),
			description: form.description.trim().length
				? form.description.trim()
				: null,
			questions,
		}).unwrap();

		navigate(`/forms/${res.createForm.id}/fill`);
	};

	return (
		<div className="space-y-4">

			<Card className="p-6 space-y-4">
				<h1 className="text-xl font-bold">Create form</h1>

				<div className="space-y-2">
					<div className="text-sm font-medium">Title *</div>

					<Input
						value={form.title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Form title"
					/>
				</div>

				<div className="space-y-2">
					<div className="text-sm font-medium">Description</div>

					<textarea
						value={form.description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full rounded-lg border px-3 py-2"
						placeholder="Form description"
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					<Button type="button" onClick={addQuestion}>
						Add question
					</Button>

					<Button
						type="button"
						variant="primary"
						onClick={onSave}
						disabled={!canSave || isLoading}
					>
						{isLoading ? "Saving..." : "Save form"}
					</Button>

					{error && (
						<div className="text-sm text-red-600">Save failed</div>
					)}
				</div>
			</Card>

			<div className="space-y-3">
				{form.questions.map((question, i) => (
					<QuestionCard
						key={question.id}
						index={i}
						question={question}
						canRemove={form.questions.length > 1}
						onRemove={() => removeQuestion(question.id)}
						onChangeTitle={(title) => updateQuestion(question.id, {title})}
						onChangeType={(type) => setQuestionType(question.id, type)}
						onChangeRequired={(required) => updateQuestion(question.id, {required})}
						onAddOption={() => addOption(question.id)}
						onChangeOption={(optionId, label) => updateOption(question.id, optionId, label)}
						onRemoveOption={(optionId) => removeOption(question.id, optionId)}
					/>
				))}
			</div>
		</div>
	);
}
