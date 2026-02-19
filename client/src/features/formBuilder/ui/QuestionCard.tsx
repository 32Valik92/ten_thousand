import type {QuestionType} from "../../../services/generated";
import type {DraftQuestion} from "../model/types";
import OptionsEditor from "./OptionsEditor";


type Props = {
	index: number;
	question: DraftQuestion;
	canRemove: boolean;

	onRemove: () => void;
	onChangeTitle: (title: string) => void;
	onChangeType: (type: QuestionType) => void;
	onChangeRequired: (required: boolean) => void;

	onAddOption: () => void;
	onChangeOption: (optionId: string, label: string) => void;
	onRemoveOption: (optionId: string) => void;
};


export default function QuestionCard({
	                                     index,
	                                     question,
	                                     canRemove,
	                                     onRemove,
	                                     onChangeTitle,
	                                     onChangeType,
	                                     onChangeRequired,
	                                     onAddOption,
	                                     onChangeOption,
	                                     onRemoveOption,
                                     }: Props) {

	const isChoice =
		question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX";

	return (
		<div className="rounded-xl border bg-white p-4 space-y-3">
			<div className="flex items-start justify-between gap-3">
				<div className="font-semibold">Question #{index + 1}</div>

				{canRemove && (
					<button
						type="button"
						onClick={onRemove}
						className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
					>
						Remove
					</button>
				)}
			</div>

			<input
				value={question.title}
				onChange={(e) => onChangeTitle(e.target.value)}
				className="w-full rounded-lg border px-3 py-2"
				placeholder="Question title"
			/>

			<div className="flex flex-wrap items-center gap-3">
				<select
					value={question.type}
					onChange={(e) => onChangeType(e.target.value as QuestionType)}
					className="rounded-lg border px-3 py-2"
				>
					<option value="TEXT">Text</option>
					<option value="DATE">Date</option>
					<option value="MULTIPLE_CHOICE">Multiple choice</option>
					<option value="CHECKBOX">Checkbox</option>
				</select>

				<label className="flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						checked={question.required}
						onChange={(e) => onChangeRequired(e.target.checked)}
					/>
					Required
				</label>
			</div>

			{isChoice && (
				<OptionsEditor
					options={question.options}
					onAdd={onAddOption}
					onChange={onChangeOption}
					onRemove={onRemoveOption}
				/>
			)}
		</div>
	);
}
