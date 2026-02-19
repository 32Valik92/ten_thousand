import type {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
};

export default function Button({ variant = "secondary", className = "", ...props }: Props) {
	const base = "rounded-lg px-4 py-2 text-sm disabled:opacity-50";
	const styles =
		variant === "primary"
			? "bg-blue-600 text-white hover:bg-blue-700"
			: "border bg-white hover:bg-slate-50";

	return <button className={`${base} ${styles} ${className}`} {...props} />;
}
