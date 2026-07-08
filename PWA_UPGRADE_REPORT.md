# Progressive Web App (PWA) Upgrade Report

We have successfully transformed **Shree Radhe Krishna Enterprises** into a fully installable, offline-capable Progressive Web App (PWA) without altering the existing visual styling, layout, or animations.

---

## 1. Cache Strategy & Service Worker

The Service Worker (`sw.js`) is declared in the root scope and implements the requested cache versioning:

```javascript
const CACHE_VERSION = "2026-06-v1";
const CACHE_NAME = `srk-cache-${CACHE_VERSION}`;
```

### Resource-Specific Caching Strategies

| Resource Type | Strategy | Detail / Fallback |
| :--- | :--- | :--- |
| **HTML Pages** | **Network First** | Fetches the latest version from the network. If the network is unavailable, serves the cached version. If the page isn't in cache, falls back to `pages/offline.html`. |
| **CSS & JS** | **Stale-While-Revalidate** | Serves the cached version instantly for fast loading, while executing a background fetch to update the cache for the next visit. |
| **Images** | **Cache First** | Checks the cache first. If found, returns immediately (highest priority). If not found, fetches from network and updates cache. |
| **Fonts & CDNs** | **Stale-While-Revalidate** | Caches standard Google Fonts and Tailwind CSS CDN (`https://cdn.tailwindcss.com`) to ensure layout integrity when offline. |

### Cache Priorities (Pre-cached Assets)
The following high-priority assets are immediately pre-cached during the Service Worker `install` lifecycle event:
1. **Product Catalog**: `pages/products.html`
2. **Gallery**: `pages/gallery.html`
3. **Logo**: `assets/logo.png`
4. **All other pages**: `pages/index.html`, `pages/about.html`, `pages/contact.html`, `pages/cart.html`
5. **Branded Offline Fallback**: `pages/offline.html`
6. **CSS/JS Styles and Scripts**: `assets/css/styles.css`, `assets/js/script.js`, `assets/js/interactions.js`, `assets/js/pwa.js`
7. **PWA manifest**: `manifest.json`
8. **PWA Icons**: All sizes from `icon-72x72.png` to `icon-512x512.png`
9. **External CDNs**: Tailwind CDN and Inter Google Fonts stylesheet

---

## 2. Offline Experience

When a user is completely disconnected and visits a page that hasn't been cached, they are redirected to a beautiful, branded offline experience in [offline.html](file:///c:/Users/purwa/OneDrive/Desktop/shop%20web/pages/offline.html).

### Offline Page Elements Included:
- **Logo**: Branded logo `assets/logo.png` is displayed centered.
- **Business Name**: **Shree Radhe Krishna Enterprises** (Kadaura, UP).
- **Direct Phone Dialer**: Actionable button referencing phone number `7905048864`.
- **WhatsApp Inquiry**: Actionable button referencing chat link `https://wa.me/917905048864`.
- **Retry Connection Button**: Simple `window.location.reload()` trigger to easily re-attempt page load when the user is back online.
- **Styling**: Retains original colors (Brand Blue and Accent Gold) and supports system dark/light mode configurations.

---

## 3. Install Experience

We integrated custom installation triggers dynamically into the storefront UI across all pages:

1. **Footer Install Link**: Injected as an inline `<button>` labeled **Install App** inside the footer page lists on all pages (`index.html`, `products.html`, `gallery.html`, `about.html`, `contact.html`, `cart.html`).
2. **Mobile Menu Install Link**: Injected as an `<a>` link styled consistently in the responsive drawer.
3. **Lifecycle Management**:
   - The elements remain hidden by default (`class="hidden"`).
   - When the browser fires the `beforeinstallprompt` event, the client script `pwa.js` intercepts it, stores the event, and shows the install triggers.
   - Clicking either trigger calls the native installation prompt.
   - Once the app is successfully installed (or if the user accepts), the install triggers are immediately hidden again to prevent clutter.

---

## 4. Update Flow

We established an update notification loop when a new version of the app becomes available:

1. A new service worker registers. When the user navigates, it notices a change in `sw.js` and becomes "waiting".
2. The client script `pwa.js` catches the `waiting` state and displays the requested custom toast notification:
   > **"New version available. Refresh to update."**
3. Clicking the toast triggers `skipWaiting()` in the service worker via a postMessage.
4. The service worker instantly activates, fires the `controllerchange` event, and automatically reloads the browser to render the updated storefront contents.

---

## 5. Lighthouse Estimate

Based on standard offline assets pre-caching, manifest declarations, responsive elements, and semantic SEO tags, the app is optimized for high ratings:

| Metric | Target Score | Optimization Methods |
| :--- | :--- | :--- |
| **Performance** | **> 90** | Highly efficient caching strategies, lightweight tailwind components, lazy-loaded images, and local scripts. |
| **Accessibility** | **> 90** | Descriptive contrast settings, explicit `aria-expanded` attributes on interactive panels, and semantic titles. |
| **Best Practices** | **> 90** | Fully secure external links (`rel="noopener"`), correct image aspect ratios, and clean console output (duplicate syntax errors resolved). |
| **SEO** | **> 90** | Structured schema mappings (LocalBusiness, Organization), metadata descriptions, search indexable headings, and localized content. |
| **PWA** | **> 90** | Fully registerable Service Worker, manifest metadata, correct sizes for maskable icons, offline fallback pages, and HTTPS/Localhost install prompts. |

---

## 6. Future Improvements

To take this progressive storefront further, we can implement the following enhancements in future phases:

* **Background Sync**: Deferred offline actions (such as adding items to cart or saving preferences) can be synced back automatically as soon as a network connection is recovered.
* **Push Notifications**: Inform customers of order status updates, new book arrivals, board exam schedules, and seasonal stationery offers.
* **Offline Inquiry Queue**: Allow users to fill out the "Send Enquiry" contact form or complete a mock checkout while offline. The inquiries will be stored in an IndexedDB queue and automatically sent to the server/WhatsApp when connection is restored.
