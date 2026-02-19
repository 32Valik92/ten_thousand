import type {ReactNode} from "react";

type Props = {
	className?: string;
	children: ReactNode;
};

export default function Card({ className = "", children }: Props) {
	return <div className={`rounded-xl border bg-white ${className}`}>{children}</div>;
}
