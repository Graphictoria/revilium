# revilium

Revilium is a Roblox private server written in Svelte and Tailwind.

## Developing for Revilium

Please make changes on new branches and target the `sitetest` branch.

## Development Environment

Revilium uses vite for building the site, as is standard for SvelteKit. This makes it easy to quickly spin up a development server for working on Revilium.

### Setting it up

Revilium requires a SQL database. First, start an SQL server supported by [Prisma](https://www.prisma.io/) and define the connection URL in `.env`. An example `.env` file is located at `.env.example`.

After setting up the SQL database, run the following commands to start the development server.

```bash
npx prisma generate
npx prisma migrate deploy
npm run dev
```

After making changes to `prisma/schema.prisma` you **MUST** run `npx prisma deploy dev --name "migration_name"`, and restart the vite development server.
