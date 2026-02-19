import { Link, Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="min-h-screen bg-slate-100">
			<header className="border-b bg-white">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
					<Link to="/" className="font-bold">
						Forms Lite
					</Link>
					<Link
						to="/forms/new"
						className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
					>
						Create new
					</Link>

				</div>
			</header>

			<main className="mx-auto max-w-5xl px-4 py-6">
				<Outlet />
			</main>
		</div>
	);
}
