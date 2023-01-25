# dossier-next-sqlite-app

This is a template for an app using [Dossier](https://dossierhq.dev/), [Next.js](https://nextjs.org/)
and [SQLite](https://www.sqlite.org/).

In order to keep things as simple as possible, this template doesn't have any auth. I.e. there no
need to login and all users use the same anonymous user. In order to protect the data, in production
(`npm run start:production`) only read-only published content can be accessed, and the Dossier web
interface is disabled.

> **Warning**
> When deploying to Netlify or Vercel you will only be able to use Dossier at build-time, since
> Next.js cloud functions don't support opening SQLite databases in run-time. Running locally, or in
> a "normal" Node server doesn't have this restriction.

## Getting started

- `npm init using dossierhq/dossier-next-sqlite-app my-project`
- `cd my-project`
- `git init && git add . && git commit -m '🚀 Created project 🚀'`
- `npm install`
- `npm run build`
- `npm start`

You should now have a working app running at http://localhost:3000. Try to add an entity type to the
schema and create some entities.

A new SQLite database will be created in `data/database.sqlite`. By adding it to Git you can keep
the state of Dossier and synchronize it between computers.

## Deploy

### Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dossierhq/dossier-next-sqlite-app)

- [Demo](https://demo--snazzy-klepon-8fdb41.netlify.app/) (using the
  [demo](https://github.com/dossierhq/dossier-next-sqlite-app/tree/demo) branch)
- **N.B** Only static (i.e. build-time) usages of Dossier are supported on Netlify when using an
  SQLite database.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdossierhq%2Fdossier-next-sqlite-app)

- [Demo](https://dossier-next-sqlite-app.vercel.app/) using the
  [demo](https://github.com/dossierhq/dossier-next-sqlite-app/tree/demo) branch)
- **N.B** Only static (i.e. build-time) usages of Dossier are supported on Vercel when using an
  SQLite database.
