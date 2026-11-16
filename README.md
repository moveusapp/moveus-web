# MoveUs Web

Web frontend for MoveUs.

## Local development

```bash
npm install
npm run dev
```

Open [localhost:5173](http://localhost:5173). The app uses `localhost:8000` by default. Set `VITE_API_HOST` to use a different host.

## Production

Upon pushing to `main`, a Cloudfare Worker starts which automatically deploys the latest commit to production.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development mode |
| `npm run build` | Create a production build (you'll probably never need to use this directly) |
| `npm run graphql` | Generate GraphQL types |
