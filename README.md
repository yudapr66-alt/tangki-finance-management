# Tangki Finance Management

Frontend migration target for Cloudflare Pages.

## Architecture

- Static frontend: Cloudflare Pages
- API route: Cloudflare Pages Functions at `/api/tangki`
- Existing backend/database: Google Apps Script + existing Google Sheets spreadsheet

The existing Apps Script project and spreadsheet remain the source of truth. Do not recreate, clear, or migrate the spreadsheet.

## Current migration status

This repository contains the initial deployment scaffold only. The original Apps Script UI and backend API adapter still need to be ported and verified against the existing source.

## Cloudflare Pages settings

- Framework preset: None
- Build command: (none)
- Build output directory: `public`
- Root directory: repository root

Deploying this scaffold does not activate the application API yet. Configure the Apps Script endpoint in the Pages Function only after the Apps Script `doPost` router is added and deployed.
