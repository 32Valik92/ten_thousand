import express from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";

import { schema } from "./graphql/schema";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/graphql", createHandler({ schema }));

app.listen(4000, () => {
	console.log("GraphQL running");
});
