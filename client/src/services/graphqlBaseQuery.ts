import type {BaseQueryFn} from "@reduxjs/toolkit/query";

type GraphqlRequestArgs = {
	document: string;
	variables?: Record<string, unknown> | void;
};

type GraphqlResponse<T> = {
	data?: T;
	errors?: Array<{ message: string }>;
};

export const graphqlBaseQuery = (opts: { url: string }):
	BaseQueryFn<
		GraphqlRequestArgs,
		unknown,
		{ message: string }
	> => async ({document, variables}) => {
	try {
		const res = await fetch(opts.url, {
			method: "POST",
			headers: {"content-type": "application/json"},
			body: JSON.stringify({
				query: document,
				variables: variables ?? undefined,
			}),
		});

		const json = (await res.json()) as GraphqlResponse<unknown>;

		if (!res.ok)
			return {error: {message: `HTTP ${res.status}`}};

		if (json.errors?.length)
			return {
				error: {
					message: json.errors
						.map((e) => e.message)
						.join("; "),
				},
			};

		return {data: json.data ?? null};

	} catch (e: unknown) {

		return {
			error: {
				message:
					e instanceof Error
						? e.message
						: "Unknown error",
			},
		};
	}
};
