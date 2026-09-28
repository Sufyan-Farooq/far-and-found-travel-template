# Far & Found

A responsive, single-page travel website template with an editorial look. The demo has no booking backend, business contact details, or package prices.

## Features

- Three-destination hero slideshow that advances every 6.5 seconds
- Manual slide controls, pause/play, and reduced-motion support
- Destination cards that prefill the trip-brief form
- A destination index featuring Azerbaijan, Georgia, Dubai, Egypt, Malaysia, Russia, and Bangkok & Pattaya
- Floating WhatsApp shortcut with a deliberately invalid demo number
- Copyable travel brief; nothing is submitted or stored
- Mobile navigation, keyboard focus states, and locally hosted fonts
- Original AI-generated demo imagery

## Run locally

Open `index.html` in a browser, or serve the folder with any static server. For example:

```sh
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Make it yours

1. Replace the demo name and compass mark in `index.html` and the favicon in `assets/favicon.svg`.
2. Change the three destination photos and their alt text in `index.html`.
3. Keep the slideshow text in the `slides` array in `script.js` in the same order as the hero images.
4. Edit colors and typography in the variables at the top of `styles.css`.
5. Replace `000000000000` in the WhatsApp link in `index.html` with your business number before launch.
6. Replace or connect the trip-brief form if you need real enquiries or bookings. The included form creates a local, copyable summary.

The demo images were generated for this template. The bundled El Messiri and Karla fonts are distributed under the SIL Open Font License; their notices are in `assets/*-OFL.txt`.
