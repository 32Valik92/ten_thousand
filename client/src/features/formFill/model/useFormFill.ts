import { useState } from "react";
import type { FillState } from "./types";

export const useFormFill = () => {
	const [values, setValues] = useState<FillState>({});

	const patch = (questionId: string, patch: FillState[string]) => {
		setValues((value) => ({
			...value,
			[questionId]: {
				...(value[questionId] ?? {}),
				...patch,
			},
		}));
	};

	return { values, patch };
};



export const validateRequired = (
	requiredIds: string[],
	values: FillState
): string[] => {
	return requiredIds.filter((id) => {
		const value = values[id];
		if (!value) return true;
		return (
			!value.text &&
			!value.date &&
			!value.optionId &&
			!(value.optionIds && value.optionIds.length > 0)
		);
	});
};
