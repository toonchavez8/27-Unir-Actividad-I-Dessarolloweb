# DM Journel Monorepo

This repository now uses [Turborepo](https://turbo.build/repo) to manage the legacy Vite application and the new Next.js application from a single workspace. Turbo orchestrates shared scripts, parallel dev servers, and makes it easy to add more packages over time.

## Prerequisites

- Node.js 20+
- npm 10+

Remove any existing `node_modules` folders and lockfiles inside individual apps after migrating, then reinstall from the workspace root so dependencies are hoisted correctly.

```bash
rm -rf legacy-vite-app/node_modules next-app/node_modules
rm legacy-vite-app/package-lock.json next-app/package-lock.json
npm install
```

On Windows PowerShell, replace `rm` with `Remove-Item -Recurse -Force`.

## Install dependencies

```bash
npm install
```

This creates a single `package-lock.json` at the root and links workspaces for all apps.

## Available scripts

```bash
npm run dev        # Runs dev servers for all apps in parallel (Turbo persistent tasks)
npm run build      # Builds every app
npm run lint       # Lints every app
npm run clean      # Runs each package's clean script
npm run dev:legacy # Only run the legacy Vite app dev server
npm run dev:next   # Only run the Next.js dev server
```

### Per-package scripts

Each app still exposes its own scripts when you need to run them directly:

- `legacy-vite-app`: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`, `npm run clean`, `npm run deepclean`
- `next-app`: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run format`, `npm run clean`

You can execute any script in a specific workspace via npm:

```bash
npm run build --workspace @dm/legacy-vite-app
npm run lint --workspace @dm/next-app
```

## Adding another project

1. Create a new directory at the repository root, e.g. `packages/my-new-app`.
2. Initialize its own `package.json` and give it a unique workspace name, e.g. `@dm/my-new-app`.
3. Add any project-specific dependencies and scripts.
4. Add the folder path to the root `package.json > workspaces` array.
5. Run `npm install` at the root to link the workspace.
6. Optionally extend `turbo.json` with project-specific tasks or outputs.

After that, Turbo automatically includes the new project in shared commands like `npm run dev` (as long as the package exposes a matching `dev` script).

## Troubleshooting

- If Turbo cannot find a script, ensure the corresponding package defines it in its `package.json`.
- When adding new build artifacts, update `turbo.json` `tasks.build.outputs` to include the output paths, so caching works correctly.
- Use `turbo run <task> --filter=<workspace>` to scope commands.

Happy hacking!
