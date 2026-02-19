export const typeDefs = /* GraphQL */ `
    enum QuestionType {
        TEXT
        MULTIPLE_CHOICE
        CHECKBOX
        DATE
    }

    type Option {
        id: ID!
        label: String!
    }

    type Question {
        id: ID!
        title: String!
        type: QuestionType!
        required: Boolean!
        options: [Option!]
    }

    type Form {
        id: ID!
        title: String!
        description: String
        questions: [Question!]!
        createdAt: String!
    }

    type Answer {
        questionId: ID!
        textValue: String
        dateValue: String
        optionId: ID
        optionIds: [ID!]
    }

    type Response {
        id: ID!
        formId: ID!
        answers: [Answer!]!
        createdAt: String!
    }

    input OptionInput {
        label: String!
    }

    input QuestionInput {
        title: String!
        type: QuestionType!
        required: Boolean!
        options: [OptionInput!]
    }

    input AnswerInput {
        questionId: ID!
        textValue: String
        dateValue: String
        optionId: ID
        optionIds: [ID!]
    }

    type Query {
        forms: [Form!]!
        form(id: ID!): Form
        responses(formId: ID!): [Response!]!
    }

    type Mutation {
        createForm(
            title: String!
            description: String
            questions: [QuestionInput!]
        ): Form!

        submitResponse(
            formId: ID!
            answers: [AnswerInput!]!
        ): Response!
    }
`;