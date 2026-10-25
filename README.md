# KAVACH — Simulation Command

An India-inspired, responsive defense technology hackathon prototype with four functional modules. All positions, telemetry, terrain cells, patient identifiers and vitals are fictional. No credentials, API keys, dependencies, or external map tiles are needed.

## Run

Install Node.js 20 or later, then from this repository run:

```sh
npm start
```

Open http://127.0.0.1:4173. Do not double-click index.html: ES modules and offline caching require HTTP/HTTPS. Run `npm test` to execute the algorithm tests. No `npm install` is required.

## Modules

- **Airspace overview:** six moving simulated aircraft, 2-second updates, selectable tracks, 20-second constant-velocity projection, a sorted risk table, observation acknowledgment and activity log. Pause/resume freezes telemetry across modules. Risk score = unknown authorization (40) + zone proximity (35 inside 22 grid units or 18 inside 38) + approaching center (15) + altitude below 150 m (10), capped at 100. High >=70; Watch >=40; Low otherwise. Grid coordinates are dimensionless and fictional; altitude is synthetic AGL.
- **Team communication:** up to 200 locally persisted messages; BroadcastChannel and storage events synchronize tabs of the same browser/origin. User text is escaped before rendering. JSON export supports manual transfer. This is not a cross-device, mesh, encrypted, or decentralized communication implementation.
- **Reconnaissance:** compare two deterministic 8x8 synthetic intensity grids, adjust a threshold, highlight changed cells and export structured observations. Six cells change at the default threshold. It does not process real imagery or infer real-world intelligence.
- **Medical & evacuation:** simulated vitals with illustrative priority rules and Dijkstra shortest paths on a five-node fictional network. Block edges to recalculate routes; blocking both exits from the aid post yields no route. Estimates use synthetic minute weights. Training rules are not validated medical guidance.

Each module exports a JSON report with its assumptions and current data. Live simulation state resets on reload; messages persist in browser storage. Hazards and acknowledgments are session-only.

## Offline behavior

A service worker precaches all seven runtime resources on the first successful localhost/HTTPS visit. Wait for the “Offline cache ready” notice before disconnecting. Reloads, simulation, analysis and local messages then continue offline; no external requests are required. The connection indicator reflects browser online status, not a server heartbeat. Browser storage restrictions can prevent persistence or caching. Clear this site's storage to reset the local message history. Increment the cache version in sw.js when releasing changed assets.

## Hosting on GitHub Pages

The application is buildless and uses relative asset URLs, including the service worker scope, so it supports a repository subpath.

1. In this repository, open **Settings → Pages**.
2. Choose **Deploy from a branch**, select **main** and **/(root)**, then Save.
3. Open the URL GitHub provides after deployment finishes.

No GitHub Actions workflow or elevated workflow token is required. This repository includes `.nojekyll` to serve the files directly. Public hosting has not been enabled automatically.

## Demonstration

1. Observe moving tracks; select UAV-024 and acknowledge it.
2. Pause; confirm positions stop changing, then resume.
3. Send an ALPHA message; verify it in a second tab and after reload.
4. Run terrain comparison: expect six changed cells at threshold 30. Raise threshold to 100: expect none.
5. Block the bridge route: the 6-minute route becomes 9 minutes. Block Aid post → Junction too: no route remains.
6. Export each module's report; reopen after disconnecting once the cache is ready.

## Validation

`npm test`: seven tests cover trajectory arithmetic, risk classification, medical rule boundaries, shortest-route rerouting/disconnection, and change thresholds. The code is plain HTML/CSS and native JavaScript modules. Responsive breakpoints adapt the sidebar to mobile navigation and stack map/detail panels.

## Files

- `index.html`, `style.css`, `app.js`: interface and simulation
- `algorithms.js`: pure calculation functions
- `sw.js`, `manifest.webmanifest`, `icon.svg`: offline app shell
- `server.js`: dependency-free localhost development server
- `tests/algorithms.test.js`: algorithm verification

This is an educational simulation prototype, not an operational defense, airspace security, clinical, or emergency dispatch system.

Browser checks completed: desktop rendering, pause state, six-cell terrain analysis, disconnected evacuation path, and message submission.
Offline verification: stopped the HTTP server, reloaded the cached app, opened a second tab, and confirmed new messages synchronized back to the first tab. Mobile layout inspected at 390 × 844.
