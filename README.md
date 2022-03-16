# Deno GitHub API Web App

### Usage

Copy .env:

```
cp .env.sample .env
```

and set GitHub OAuth token

Generate Secret:

```
deno run -A clis/secretKeyGen.ts
```

Start the project:

```
deno run -A --no-check --watch main.ts
```

After adding, removing, or moving a page in the `routes` directory, run:

```
fresh manifest
```
