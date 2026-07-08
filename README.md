# Shree Radhe Krishna Enterprises Website

A premium static business website for **Shree Radhe Krishna Enterprises**, a local bookstore and stationery store based in Kadaura, Uttar Pradesh. The project is built using pure **HTML, CSS, and JavaScript** with a modern responsive layout, product catalog, shopping cart experience, gallery, contact actions, local SEO, and Progressive Web App support.

## Live Preview

Add your GitHub Pages or hosting link here after deployment:

```text
https://your-username.github.io/your-repository-name/
```

## Project Overview

This website presents Shree Radhe Krishna Enterprises as a professional local business storefront. It includes product browsing, category filtering, cart management, store gallery, contact information, WhatsApp inquiry links, and an offline-ready PWA experience.

The design focuses on a clean premium look with strong branding, smooth interactions, responsive layouts, and useful customer actions.

## Features

- Modern responsive business website
- Premium homepage with branded hero section
- Product catalog with multiple store categories
- Product search and category filtering
- Quick view product modal
- Add to cart functionality
- Quantity increase, decrease, and remove cart actions
- Cart total calculation
- Cart persistence using `localStorage`
- Store gallery with filterable image grid
- Contact page with business details
- WhatsApp inquiry and call buttons
- Light and dark mode support
- Smooth scroll reveal animations
- Local SEO metadata and schema markup
- Progressive Web App setup
- Offline fallback page
- Service worker caching
- App install prompt support

## Pages Included

- `Home` - Premium business landing page
- `Products` - Product listing, search, filters, and quick view
- `Gallery` - Store and product showcase gallery
- `About` - Business story, values, and trust content
- `Contact` - Store information and inquiry section
- `Cart` - Shopping cart summary and checkout-style layout
- `Offline` - Branded offline fallback page for PWA mode

## Tech Stack

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Service Worker
- Web App Manifest
- JSON-LD SEO schema

No backend, database, or build tool is required.

## Folder Structure

```text
shop web/
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   |-- script.js
|   |   |-- interactions.js
|   |   `-- pwa.js
|   |-- icons/
|   |   |-- icon-72x72.png
|   |   |-- icon-96x96.png
|   |   |-- icon-128x128.png
|   |   |-- icon-192x192.png
|   |   |-- icon-256x256.png
|   |   `-- icon-512x512.png
|   `-- logo.png
|-- pages/
|   |-- index.html
|   |-- products.html
|   |-- gallery.html
|   |-- about.html
|   |-- contact.html
|   |-- cart.html
|   `-- offline.html
|-- manifest.json
|-- sw.js
`-- README.md
```

## Product Categories

The product catalog includes:

- School Books
- NCERT Books
- Competitive Exam Books
- Stationery
- Notebooks and Registers
- Sports Equipment
- Art and Craft
- Office Supplies

## How to Run Locally

Because this is a static website, you can open it directly in a browser.

1. Download or clone the project.
2. Open `pages/index.html` in your browser.
3. Browse the website normally.

For the best PWA and service worker testing experience, run it through a local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/pages/index.html
```

## GitHub Pages Deployment

GitHub Pages works best when the main `index.html` file is in the root folder. This project currently keeps the homepage inside:

```text
pages/index.html
```

For easy GitHub Pages deployment, you can either:

- move `pages/index.html` to the root folder, or
- keep the structure and configure routing carefully based on your hosting setup.

Recommended simple setup:

1. Push the project to GitHub.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Select the `main` branch.
5. Select `/root`.
6. Make sure the homepage is available as `index.html`.

## PWA Support

This project includes Progressive Web App files:

- `manifest.json`
- `sw.js`
- `assets/js/pwa.js`
- `pages/offline.html`
- app icons in `assets/icons/`

The service worker handles caching for pages, styles, scripts, images, icons, and offline fallback behavior.

## Business Details

```text
Business: Shree Radhe Krishna Enterprises
Location: Kadaura, Uttar Pradesh, India
Phone: +91 7905048864
Email: srkenterprises.kadaura@gmail.com
```

## Future Improvements

- Connect checkout to a real payment system
- Add backend inventory management
- Replace placeholder/product images with real store photos
- Add admin dashboard for product updates
- Add customer inquiry form backend
- Add order tracking and notification system

## Project Status

The website is ready as a polished static business showcase and portfolio project. It can be hosted on GitHub Pages, Netlify, Vercel, or any static hosting platform.
