# Cookbook app

This app is built with Next.js & TypeScript. Uses `next-auth` for any auth purposes.

## Prerequisites

Node.js >=14 and `npm` >=7 is required to run this project locally.

## Running locally

1. Clone this repo on your machine
2. `cd` into root directory of this project & run `npm i` (or `npm ci` if you don't want to have your lock file updated)
3. Create `.env` file, examine `.env.example` file and copy the contents of it to `.env` file. Variables with predefined values can be used as is. Variables without any values (e.g. `GOOGLE_CLIENT_ID=""`) should be filled with corresponding values.
4. Run `npm run dev` to start local development server (usually `http://localhost:3000`)
5. (Optional) Run `npm run build && npm start` to start your local "production" server (usually `http://localhost:3000`)

## Environment variables

This project requires following environment variables to work correctly:

- `NEXTAUTH_URL`: app URL string, put `http://localhost:3000` (or any other host + port combination that you use for development server). In production this should point to the exact URL where this app is accessible.
- `NEXTAUTH_SECRET`: secret string used for encryption. Run `npm run generate:secret` (assuming you have all dependencies installed) to generate a secret.
- `GOOGLE_CLIENT_ID`: app identifier for Google OAuth. Can be obtained from GCP console.
- `GOOGLE_CLIENT_SECRET`: secret string to verify tokens issued by Google OAuth. Can be obtained from GCP console.
