# CTPL ITMS landing page

Plain HTML, CSS and JavaScript. No build step, no npm install.

## Run in VS Code
1. Unzip, then in VS Code choose File > Open Folder and pick `ctpl-itms-landing`.
2. Install the "Live Server" extension (VS Code suggests it automatically).
3. Right-click `index.html` and choose "Open with Live Server".

Without Live Server you can also double-click `index.html`.
(Google Fonts need an internet connection.)

## Files
- `index.html`: page content (header, hero "Our Story", all sections, footer)
- `css/styles.css`: design tokens (colours, fonts, spacing) at the top, then all styles
- `js/main.js`: capabilities marquee, entrance animation, contact form check
- `images/hero-building.jpg`: hero background photo
- `images/ctpl-logo.png`: header logo
- `CLAUDE.md`: your project brief (content source)

## Common edits
- Marquee speed: `.track { animation: mv 55s ... }` in `css/styles.css` (smaller = faster)
- Hero text position: `.story { margin: ... }` in `css/styles.css`
- Colours: the `:root { --brand-500 ... }` block at the top of `css/styles.css`

## TODO (from CLAUDE.md)
Company address/phone/email, contact form destination (the form currently only shows a message and sends nothing), datasheet PDF, certification status, third local language.
