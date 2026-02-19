import type { DraftOption } from "../model/types";

type Props = {
	options: DraftOption[];
	onAdd: () => void;
	onChange: (optionId: string, label: string) => void;
	onRemove: (optionId: string) => void;
};

export default function OptionsEditor({
	                                      options,
	                                      onAdd,
	                                      onChange,
	                                      onRemove,
                                      }: Props) {
	return (

		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="text-sm font-medium">
					Options
				</div>

				<button
					type="button"
					onClick={onAdd}
					className="rounded-lg border bg-white px-3 py-1 text-sm hover:bg-slate-50"
				>
					Add option
				</button>
			</div>


			{options.length === 0 && (
				<div className="text-sm text-slate-500">
					No options yet
				</div>
			)}

			{options.map((option) => (
				<div key={option.id} className="flex gap-2">
					<input
						value={option.label}
						onChange={(e) => onChange(option.id, e.target.value)}
						className="w-full rounded-lg border px-3 py-2"
						placeholder="Option label"
					/>

					<button
						type="button"
						onClick={() => onRemove(option.id)}
						className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
					>
						Remove
					</button>

				</div>
			))}
		</div>
	);
}
