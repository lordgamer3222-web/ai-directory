# AI Library

A responsive AI tools directory built with React, Vite, Express, MongoDB/Mongoose, and the Google Gemini API.

## Requirements

- Node.js 20 or newer
- MongoDB local instance or MongoDB Atlas database
- A Gemini API key from Google AI Studio for the AI search

## Local setup

1. Copy the example files and fill in your own values:

   ```sh
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

2. Edit `server/.env`:

   - `MONGODB_URI`: your database connection string.
   - `GEMINI_API_KEY`: your private Gemini key. Keep it on the server; never use a `VITE_` variable for it.
   - `GEMINI_MODEL`: a model enabled for your Gemini account.
   - `ADMIN_TOKEN`: set a unique random value with at least 32 characters. For example, generate one with `openssl rand -hex 32`.
   - `CLIENT_ORIGIN`: the deployed frontend origin. Multiple origins can be comma-separated. Include the exact HTTPS origin for each frontend domain.
   - `RESEND_API_KEY` and `PASSWORD_RESET_FROM`: a Resend API key and sender address on a verified domain for email verification codes.

3. Install packages and start the app from the project root:

   ```sh
   npm run install:all
   npm run dev
   ```

4. Open the directory at `http://localhost:5173`. The protected dashboard is at `http://localhost:5173/admin`. Sign in with the `ADMIN_TOKEN` value from `server/.env`.

The client proxies `/api` to `http://localhost:5001` during local development. The API health check is `http://localhost:5001/api/health`.

## Admin dashboard

The `/admin` page can list, search, add, edit, and delete tools. Each tool has an ID, name, description, category, pricing, official website URL, tags, and icon settings. Community submissions remain unpublished until an administrator approves them in the Suggestions tab.

Admin routes require a bearer token checked by the server. The browser keeps the token in memory only, so signing in again is required after a page reload. Admin access is unavailable until `ADMIN_TOKEN` is configured. Use a unique high-entropy token, deploy over HTTPS, and rotate the token if it is exposed.

The backend validates tool fields and official URLs. Icon uploads accept PNG, JPEG, or WebP images up to 2 MB. Uploaded files receive server-generated names and are stored outside the web client bundle. Existing tools without a custom icon use the Google Favicon service based on the hostname in their official URL; if the favicon cannot load, the card shows the tool's initial.

On the first successful MongoDB startup after this upgrade, the app assigns IDs to existing records and imports any missing entries from the 148-tool catalog in `shared/catalog.mjs`. A migration marker prevents deleted catalog entries from being re-added on later startups. The existing collections for saved tools and feedback remain in use.

## Gemini AI search

The Ask Gemini endpoint reads the catalog from MongoDB and sends a limited set of matching records to Gemini. Gemini can select tool IDs and explain the match, but the backend rejects unknown IDs and adds names, descriptions, pricing, icons, and official URLs from MongoDB. The chat renders those recommendations as cards with clickable official website links. URLs in generated text are removed so a model response cannot create a link that bypasses the catalog.

MongoDB and Gemini credentials are required for AI recommendations. If either is missing, the page shows a configuration message and the regular directory continues to work.

## Password reset email

Forgot-password verification codes are sent through Resend. Verify your sending domain in Resend, then set `RESEND_API_KEY` and `PASSWORD_RESET_FROM` in the server environment (for example, `AI Library <noreply@your-domain.com>`). Codes expire after 10 minutes and are limited to five code attempts. The API returns a generic confirmation whether or not an account exists for the submitted address.

In production, account cookies use `SameSite=None; Secure` so the browser can send them between a custom frontend domain and the Render API. Keep the site on HTTPS and set `CLIENT_ORIGIN` to the exact frontend origin(s).

## Google AdSense Auto Ads

AdSense is an optional integration point. No publisher ID is included, and this project does not claim that the site is approved by Google.

1. Apply for AdSense, add and verify your own site, and complete Google's review process.
2. After Google provides your publisher ID, set `VITE_ADSENSE_CLIENT_ID=ca-pub-<your-digits>` in `client/.env` or in the frontend build environment.
3. Build/redeploy the client so Vite includes the setting. The AdSense script loads only when the value matches the publisher ID format. Enable Auto Ads and choose placements in your AdSense account.

Do not add an example or another publisher's ID. If your site is not approved, leave the placeholder unchanged; no ad script will load.

## Deployment and uploaded icons

Deploy the frontend and API so `/api` and `/uploads/tool-icons` reach the Express service, or configure the frontend host to proxy those paths. Include the root `shared/catalog.mjs` file with the backend deployment; it is the source for the first-run MongoDB catalog seed. Configure the frontend host to serve `index.html` for `/admin` so the client route can load directly.

The default upload directory is `server/uploads/tool-icons`. Many cloud hosts use disposable local storage, so set `UPLOAD_DIR` to a persistent disk or mounted volume in production. Keep that volume mounted after redeploys and backups. The upload directory is ignored by Git and is not included in the project source archive. Configure `CLIENT_ORIGIN`, MongoDB access rules, HTTPS, and your hosting platform's persistent storage before launch.

## Included features

- Searchable AI tools catalog with category, price, sort, and saved filters
- Automatic website favicons, uploaded custom icons, and initial-letter fallback
- Protected admin CRUD and moderated community submissions
- Gemini tool recommendations linked only to MongoDB catalog URLs
- Optional AdSense Auto Ads script integration
- Saved tools with MongoDB persistence and browser local-storage fallback
- Feedback API and responsive layouts

Never commit `server/.env`, `client/.env`, uploaded icons, publisher credentials, or API keys.
