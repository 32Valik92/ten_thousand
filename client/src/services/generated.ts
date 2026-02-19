import { api } from "./api";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {
  [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
};

export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Answer = {
  __typename?: "Answer";
  dateValue?: Maybe<Scalars["String"]["output"]>;
  optionId?: Maybe<Scalars["ID"]["output"]>;
  optionIds?: Maybe<Array<Scalars["ID"]["output"]>>;
  questionId: Scalars["ID"]["output"];
  textValue?: Maybe<Scalars["String"]["output"]>;
};

export type AnswerInput = {
  dateValue?: InputMaybe<Scalars["String"]["input"]>;
  optionId?: InputMaybe<Scalars["ID"]["input"]>;
  optionIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  questionId: Scalars["ID"]["input"];
  textValue?: InputMaybe<Scalars["String"]["input"]>;
};

export type Form = {
  __typename?: "Form";
  createdAt: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  questions: Array<Question>;
  title: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createForm: Form;
  submitResponse: Response;
};

export type Mutation_CreateFormArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  questions?: InputMaybe<Array<QuestionInput>>;
  title: Scalars["String"]["input"];
};

export type Mutation_SubmitResponseArgs = {
  answers: Array<AnswerInput>;
  formId: Scalars["ID"]["input"];
};

export type Option = {
  __typename?: "Option";
  id: Scalars["ID"]["output"];
  label: Scalars["String"]["output"];
};

export type OptionInput = {
  label: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};

export type Query_FormArgs = {
  id: Scalars["ID"]["input"];
};

export type Query_ResponsesArgs = {
  formId: Scalars["ID"]["input"];
};

export type Question = {
  __typename?: "Question";
  id: Scalars["ID"]["output"];
  options?: Maybe<Array<Option>>;
  required: Scalars["Boolean"]["output"];
  title: Scalars["String"]["output"];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<OptionInput>>;
  required: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = "CHECKBOX",
  Date = "DATE",
  MultipleChoice = "MULTIPLE_CHOICE",
  Text = "TEXT",
}

export type Response = {
  __typename?: "Response";
  answers: Array<Answer>;
  createdAt: Scalars["String"]["output"];
  formId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
};

export type FormsQueryVariables = Exact<{ [key: string]: never }>;

export type FormsQuery = {
  __typename?: "Query";
  forms: Array<{
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
  }>;
};

export type FormQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type FormQuery = {
  __typename?: "Query";
  form?: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    questions: Array<{
      __typename?: "Question";
      id: string;
      title: string;
      type: QuestionType;
      required: boolean;
      options?: Array<{
        __typename?: "Option";
        id: string;
        label: string;
      }> | null;
    }>;
  } | null;
};

export type ResponsesQueryVariables = Exact<{
  formId: Scalars["ID"]["input"];
}>;

export type ResponsesQuery = {
  __typename?: "Query";
  responses: Array<{
    __typename?: "Response";
    id: string;
    formId: string;
    createdAt: string;
    answers: Array<{
      __typename?: "Answer";
      questionId: string;
      textValue?: string | null;
      dateValue?: string | null;
      optionId?: string | null;
      optionIds?: Array<string> | null;
    }>;
  }>;
};

export type CreateFormMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  questions?: InputMaybe<Array<QuestionInput> | QuestionInput>;
}>;

export type CreateFormMutation = {
  __typename?: "Mutation";
  createForm: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    questions: Array<{
      __typename?: "Question";
      id: string;
      title: string;
      type: QuestionType;
      required: boolean;
      options?: Array<{
        __typename?: "Option";
        id: string;
        label: string;
      }> | null;
    }>;
  };
};

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars["ID"]["input"];
  answers: Array<AnswerInput> | AnswerInput;
}>;

export type SubmitResponseMutation = {
  __typename?: "Mutation";
  submitResponse: {
    __typename?: "Response";
    id: string;
    formId: string;
    createdAt: string;
  };
};

export const FormsDocument = `
    query Forms {
  forms {
    id
    title
    description
    createdAt
  }
}
    `;

export const FormDocument = `
    query Form($id: ID!) {
  form(id: $id) {
    id
    title
    description
    createdAt
    questions {
      id
      title
      type
      required
      options {
        id
        label
      }
    }
  }
}
    `;

export const ResponsesDocument = `
    query Responses($formId: ID!) {
  responses(formId: $formId) {
    id
    formId
    createdAt
    answers {
      questionId
      textValue
      dateValue
      optionId
      optionIds
    }
  }
}
    `;

export const CreateFormDocument = `
    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
    title
    description
    createdAt
    questions {
      id
      title
      type
      required
      options {
        id
        label
      }
    }
  }
}
    `;

export const SubmitResponseDocument = `
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
  submitResponse(formId: $formId, answers: $answers) {
    id
    formId
    createdAt
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    Forms: build.query<FormsQuery, FormsQueryVariables | void>({
      query: (variables) => ({ document: FormsDocument, variables }),
    }),

    Form: build.query<FormQuery, FormQueryVariables>({
      query: (variables) => ({ document: FormDocument, variables }),
    }),

    Responses: build.query<ResponsesQuery, ResponsesQueryVariables>({
      query: (variables) => ({ document: ResponsesDocument, variables }),
    }),

    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables }),
    }),

    SubmitResponse: build.mutation<
      SubmitResponseMutation,
      SubmitResponseMutationVariables
    >({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
    }),
  }),
});

export const {
  useFormsQuery,
  useFormQuery,
  useResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = injectedRtkApi;
