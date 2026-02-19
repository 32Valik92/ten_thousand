# Google Forms Lite (Monorepo)

## Tech stack
- Client: React + TypeScript + Redux Toolkit (RTK Query) + React Router + Tailwind
- Server: Node.js (Express) + GraphQL (in-memory store)
- Types: GraphQL Codegen (client types/hooks)

## Setup
```bash
pnpm install
```

## Setup

pnpm install

## Run dev

pnpm dev

Client: http://localhost:5173  
Server: http://localhost:4000/graphql

## Codegen

pnpm --filter client codegen
