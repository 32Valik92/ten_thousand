import type {InputHTMLAttributes} from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
	return <input className={`w-full rounded-lg border px-3 py-2 ${className}`} {...props} />;
}
