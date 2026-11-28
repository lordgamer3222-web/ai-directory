# AI Directory

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
   - `RESEND_API_KEY` and `PASSWORD_RESET_FROM`: a Resend API key and sender address on a verified domain for transactional password-reset codes.

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

The backend validates tool fields and official URLs. Icon uploads accept PNG, JPEG, or WebP images up to 2 MB. Uploaded files receive server-generated names and are stored outside the web client bundle. Built-in tools use a matching Simple Icons mark or the tool's own favicon when available; if neither loads, the card uses a local initial-letter fallback. The browser does not request icons from Google.

On the first successful MongoDB startup after this upgrade, the app assigns IDs to existing records and imports any missing entries from the 148-tool catalog in `shared/catalog.mjs`. A migration marker prevents deleted catalog entries from being re-added on later startups. The existing collections for saved tools and feedback remain in use.

## Gemini AI search

The Ask Gemini endpoint reads the catalog from MongoDB and sends a limited set of matching records to Gemini. Gemini can select tool IDs and explain the match, but the backend rejects unknown IDs and adds names, descriptions, pricing, icons, and official URLs from MongoDB. The chat renders those recommendations as cards with clickable official website links. URLs in generated text are removed so a model response cannot create a link that bypasses the catalog.

MongoDB and Gemini credentials are required for AI recommendations. If either is missing, the page shows a configuration message and the regular directory continues to work.

## Password reset email

Forgot-password verification codes are transactional emails sent through Resend. Verify your sending domain in Resend, then set `RESEND_API_KEY` and `PASSWORD_RESET_FROM` in the server environment (for example, `AI Directory <noreply@your-domain.com>`). Codes expire after 10 minutes and are limited to five code attempts. The API returns a generic confirmation whether or not an account exists for the submitted address. This project does not send marketing email.

In production, account cookies use `SameSite=None; Secure` so the browser can send them between a custom frontend domain and the Render API. Keep the site on HTTPS and set `CLIENT_ORIGIN` to the exact frontend origin(s).

## Google AdSense Auto Ads

AdSense is an optional integration point. No publisher ID is included, and this project does not claim that the site is approved by Google.

1. Apply for AdSense, add and verify your own site, and complete Google's review process.
2. After Google provides your publisher ID, set `VITE_ADSENSE_CLIENT_ID=ca-pub-<your-digits>` in `client/.env` or in the frontend build environment.
3. Build/redeploy the client so Vite includes the setting. The AdSense script loads only when the value matches the publisher ID format and a visitor explicitly allows optional ads in the privacy choices panel. Visitors can decline or change their choice later. Enable Auto Ads and choose placements in your AdSense account.

The in-app choice is a code-level opt-in gate; it does not configure Google's certified CMP or its IAB TCF signals. Before serving personalized ads to people in the EEA, UK, or Switzerland, configure a Google-certified CMP in AdSense and verify the deployed consent signals against Google's current publisher requirements.

Do not add an example or another publisher's ID. If your site is not approved, leave the placeholder unchanged; no ad script will load.

## Deployment and uploaded icons

### Cloudflare Pages and search routes

For Cloudflare Pages, set the project root to the repository root, the build command to `npm run build`, and the build output directory to `client/dist`. Vite builds separate HTML entries for `/`, `/ai-search`, `/about`, `/contact`, `/privacy-policy`, `/terms-and-conditions`, and `/admin`. Keep the generated root `404.html` so unknown paths return a not-found page instead of the homepage. The `client/public/robots.txt`, `sitemap.xml`, `_redirects`, and `_headers` files are copied into the production output.

Submit `https://aidirectory.co.in/sitemap.xml` in Google Search Console after deployment. Confirm the custom domain serves HTTPS and redirects any `www` or trailing-slash variants to the canonical URLs.

Deploy the API separately and configure `/api` and `/uploads/tool-icons` to reach the Express service, or use the configured production API origin. Include the root `shared/catalog.mjs` file with the backend deployment; it is the source for the first-run MongoDB catalog seed.

The default upload directory is `server/uploads/tool-icons`. Many cloud hosts use disposable local storage, so set `UPLOAD_DIR` to a persistent disk or mounted volume in production. Keep that volume mounted after redeploys and backups. The upload directory is ignored by Git and is not included in the project source archive. Configure `CLIENT_ORIGIN`, MongoDB access rules, HTTPS, and your hosting platform's persistent storage before launch.

## Included features

- Searchable AI tools catalog with category, price, sort, and saved filters
- Same-site uploaded custom icons, built-in brand marks, and initial-letter fallback
- Dedicated AI search route with its own title, description, and canonical URL
- Crawlable static pages, robots file, and XML sitemap
- Protected admin CRUD and moderated community submissions
- Gemini tool recommendations linked only to MongoDB catalog URLs
- Optional AdSense Auto Ads script integration
- Saved tools stored in MongoDB for signed-in users; guest saved-tool storage is disabled
- Feedback API and responsive layouts

Never commit `server/.env`, `client/.env`, uploaded icons, publisher credentials, or API keys.
