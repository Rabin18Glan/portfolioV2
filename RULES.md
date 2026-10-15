# Development Rules & Architectural Principles

## 1. Follow SOLID Principles in React
- **Single Responsibility Principle (SRP)**: Each component should have a single responsibility. A component should either render UI, compose smaller components, or manage layout—never do all of them alongside data fetching and business calculations.
- **Open/Closed Principle (OCP)**: Components should be open for extension but closed for modification. Use composition (`children`, render props, slots) rather than modifying core component internals for each new variation.
- **Liskov Substitution Principle (LSP)**: Components that extend or wrap other components must remain substitutable for their base types without altering expected behavior.
- **Interface Segregation Principle (ISP)**: Do not force components to depend on fat interfaces or pass down unnecessary props. Keep prop contracts minimal and focused.
- **Dependency Inversion Principle (DIP)**: Depend on abstractions rather than concrete implementations. Abstract state and side-effect logic behind custom hooks and context providers.

## 2. No Ternary Operators in UI (Use Conditional Rendering)
- Do not use ternary operators (`condition ? <ComponentA /> : <ComponentB />`) inside JSX markup.
- Use clear conditional rendering patterns:
  - Early returns for loading, error, or empty states.
  - Explicit `if/else` branching or dedicated view subcomponents before the return statement.
  - Logical `&&` guards when rendering single elements conditionally.

## 3. Break Down Components into Smaller, Reusable Parts
- Always decompose large pages or complex views into atomic, self-contained sub-components.
- Extract common, repeated elements into reusable components.
- Colocate sub-components cleanly within feature subdirectories.

## 4. Keep Components Simple and Self-Descriptive
- Components must be intuitive, clean, and focused on their primary role rather than overloaded with excessive information or secondary tasks.
- Prioritize readability and simplicity over clever or congested abstractions.

## 5. No Logic Inside UI (Use Custom Hooks)
- Do not put data fetching, complex calculations, or business logic directly inside JSX or UI component bodies.
- Always extract business logic, side-effects, state synchronization, and handler workflows into dedicated custom hooks (`hooks/` or feature-level `use*` hooks).
- Keep UI components purely declarative—focused on displaying data and forwarding user interactions.
