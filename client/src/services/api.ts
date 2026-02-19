import { createApi } from "@reduxjs/toolkit/query/react";

import { graphqlBaseQuery } from "./graphqlBaseQuery";

// const apiUrl = import.meta.env.VITE_API_URL as string;
const apiUrl = "http://localhost:4000/graphql";

export const api = createApi({
	reducerPath: "api",
	baseQuery: graphqlBaseQuery({ url: apiUrl }),
	tagTypes: ["Forms", "Form", "Responses"],
	endpoints: () => ({}),
});
