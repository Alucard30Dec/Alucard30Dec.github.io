#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  echo "Missing .env file. Copy .env.example to .env and fill DOMAIN, LETSENCRYPT_EMAIL, DB_PASSWORD."
  exit 1
fi

docker compose -f docker-compose.prod.yml --env-file .env up -d --build

echo "Deployment started."
echo "Check containers with: docker compose -f docker-compose.prod.yml ps"
echo "Health check URL: https://$(grep '^DOMAIN=' .env | cut -d= -f2)/health"
