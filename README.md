# Furome — Shopify Embedded App

A custom embedded Shopify app built for **Furome**, using Shopify's 
Remix-based app architecture — Admin GraphQL API, Polaris UI, App 
Bridge, and webhook handling.

## What this app does
A merchant-facing app that collects and manages store data within 
the Shopify Admin — built as an embedded app so merchants interact 
with it directly inside their Shopify dashboard.

## Tech stack
- **Framework:** Remix (Shopify's official app framework)
- **Shopify APIs:** GraphQL Admin API, REST Admin API, Webhooks
- **UI:** Polaris (Shopify's design system) + App Bridge
- **Database:** Prisma + SQLite (session storage)
- **Deployment:** Docker

---
*Built on Shopify's official [Remix app template](https://github.com/Shopify/shopify-app-template-remix).*
