# Deploy OSMS Online

GitHub Pages cannot run this project directly because this app needs:

- ASP.NET Core runtime
- SQL Server
- server-side authentication and database access

If you want the app to behave like it does on your machine, deploy the project in this folder to a real server.

## Fastest path

The quickest way to get a live interactive demo is:

1. Put this project on a Linux VPS with Docker installed
2. Point a domain name to that VPS
3. Run `docker compose -f docker-compose.prod.yml --env-file .env up -d --build`
4. Open `https://YOUR_DOMAIN`

## Files already prepared

- `Dockerfile`: builds and runs the ASP.NET Core app
- `.dockerignore`: keeps the image clean
- `docker-compose.demo.yml`: starts both the web app and SQL Server
- `docker-compose.prod.yml`: starts Caddy, the web app, and SQL Server for a real public deployment
- `Caddyfile`: reverse proxy + automatic HTTPS
- `.env.example`: environment variables to copy for production
- `deploy-vps.sh`: one-command deploy helper on the server
- `Program.cs`: now retries database migration/seed on startup so container deploys are more stable
  and trusts forwarded headers behind the reverse proxy

## Step-by-step on a server

From inside `projects/Online Sales Management System`:

```bash
cp .env.example .env
# Edit DOMAIN, LETSENCRYPT_EMAIL, DB_PASSWORD
chmod +x deploy-vps.sh
./deploy-vps.sh
```

Your DNS A record must point the domain to the VPS public IP before Caddy can issue HTTPS certificates.

## Quick demo without domain

If you only want a temporary demo on raw server IP without HTTPS:

```bash
DB_PASSWORD='YourStrongPassword!2026' APP_PORT=8080 docker compose -f docker-compose.demo.yml up -d --build
```

Then open:

```text
http://YOUR_SERVER_IP:8080
```

## Demo accounts seeded by the app

The current seeder creates these accounts:

- `admin@osms.local`
- `warehouse@osms.local`
- `sales@osms.local`

Their passwords are defined in `Data/DbSeeder.cs`.

Important:

- Change these passwords before exposing the app publicly on the internet
- If you deploy publicly, add a real domain and HTTPS reverse proxy such as Nginx or Caddy

## Recommended public setup

For a recruiter-facing live demo, the safer version is:

1. VPS or cloud VM
2. Docker Compose for app + SQL Server
3. Nginx or Caddy in front
4. HTTPS domain

This repository is now prepared with Caddy as the reverse proxy.

## Health endpoint

After deployment you can verify the app is alive here:

```text
/health
```

Example:

```text
https://YOUR_DOMAIN/health
```

## What still needs a real host

This repository can now open a demo page from the portfolio, but the actual live app still must be deployed outside GitHub Pages. Once you deploy it, replace the project `demo` URL in `portfolio-data.js` with your real live domain.

Example:

```js
demo: "https://demo.yourdomain.com"
```
