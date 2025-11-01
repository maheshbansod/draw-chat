# Agent Guidelines

## Commands

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm test` - Run all tests with Vitest
- `pnpm test <filename>` - Run single test file
- `pnpm lint` - Run ESLint
- `pnpm format` - Run Prettier
- `pnpm check` - Format and fix linting issues

## Code Style

- Use Prettier config: no semicolons, single quotes, trailing commas
- Follow TanStack ESLint config
- TypeScript strict mode enabled
- Import React components with PascalCase for files/components
- Use `@/*` path aliases for src imports
- Functional components with hooks
- Tailwind CSS for styling

## Convex Specific

- Use `v` validator builder for schemas
- Include `_id` and `_creationTime` system fields automatically
- Define tables with `defineTable()` and proper validators
- Use `v.id()` for foreign key references
- Add indexes with `.index()` method where needed

## Testing

- Vitest with React Testing Library
- Test files: `*.test.ts` or `*.test.tsx`
- No existing tests - create when adding new features
