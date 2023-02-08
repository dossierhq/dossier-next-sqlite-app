# dossier-next-sqlite-app

[![Node CI](https://github.com/dossierhq/dossier-next-sqlite-app/actions/workflows/node.js.yml/badge.svg)](https://github.com/dossierhq/dossier-next-sqlite-app/actions/workflows/node.js.yml) [![Demo - Deploy to Fly](https://github.com/dossierhq/dossier-next-sqlite-app/actions/workflows/demo-deploy-fly.yml/badge.svg?branch=demo)](https://github.com/dossierhq/dossier-next-sqlite-app/actions/workflows/demo-deploy-fly.yml)

This is a template for an app using [Dossier](https://dossierhq.dev/), [Next.js](https://nextjs.org/)
and [SQLite](https://www.sqlite.org/).

In order to keep things as simple as possible, this template doesn't have any auth. I.e. there's no
need to login and all users use the same anonymous user. In order to protect the data, in production
(`npm run start:production`) only read-only published content can be accessed, and the Dossier web
interface is disabled.

> **Warning**
> When deploying to Netlify or Vercel you will only be able to use Dossier at build-time, since
> Next.js running in serverless mode don't support opening SQLite databases in run-time. Running
> locally, or in a "normal" Node server doesn't have this restriction.

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

### Docker

- `docker build --target runner -t dossier-next-sqlite-app .`
- `docker run -p 3000:3000 --mount type=bind,source="$(pwd)"/data,target=/data --env SQLITE_FILE=/data/database.sqlite dossier-next-sqlite-app`

### Fly.io

[Fly.io](https://fly.io/) allows to deploy apps with generous
[free allowance](https://fly.io/docs/about/pricing/#free-allowances).

Follow the guide to [install flyctl, sign up and sign in to Fly.io](https://fly.io/docs/hands-on/).
The generate a new Fly app:

```console
$ cd my-project
$ fly launch # select NO on deploy now
```

Change the generated file `fly.toml` and set the `PORT` environment variable to 8080, like so:

```toml
[env]
  PORT = "8080"
```

Now you can go ahead and deploy:

```console
$ fly deploy
$ fly open
```

- [Demo](https://dossier-next-sqlite-app.fly.dev/) (using the
  [demo](https://github.com/dossierhq/dossier-next-sqlite-app/tree/demo) branch)
- The database file is part of the deployed app, but it's read-only. Fly supports [persistent storage](https://fly.io/docs/reference/volumes/), but if you're using a deployed writable database you most likely want auth as well, so it's out of scope for this template

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
- **N.B** Only static (i.e. build-time) usages of Dossier are supported on
  [Vercel when using an SQLite database](https://vercel.com/guides/is-sqlite-supported-in-vercel).
