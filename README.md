# Tangki Finance Management

Migration target for Cloudflare Pages. The original Google Apps Script project and its existing Google Sheets database remain the source of truth.

## Architecture

- Frontend: Cloudflare Pages static site
- API: Pages Function at `/api/tangki`
- Backend and database: existing Google Apps Script + existing spreadsheet

## Current status

The repository has a deployment scaffold. The full original UI has been adapted locally to use the Pages API, but the temporary `public/index.html` in this repository must be replaced with the adapted UI file before production deployment. The Apps Script `doPost` router must also be added and deployed first.

See [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) for the activation sequence.

Do not recreate, clear, rename, or migrate the existing spreadsheet.
