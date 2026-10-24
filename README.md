# Orthen — web catalog

A responsive, bilingual catalog for **Orthen (Orthopedic + Engineering)**.
Persian is the default; the language control switches all text and page direction to English.

**درک بالینی. دقت مهندسی.** / **Clinical insight. Engineering precision.**

## Run

```bash
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. No dependencies, build process, environment variables or backend are required. Serve through HTTP; the catalog uses native JavaScript modules.

## Deploy

Upload the **contents of `dist/`** to any static host. All assets use relative URLs, including the locally bundled fonts, so deployment beneath a repository subpath is supported. The optional Dockerfile uses the same Nginx static-hosting method as APTUS-Catalog:

```bash
docker build -t orthen-catalog .
docker run --rm -p 8080:80 orthen-catalog
```

The `.openai/hosting.json` manifest binds this checkout to its private Sites publication; it is not required for other static hosts.

## Deploy with cPanel

The checked-in `.cpanel.yml` publishes this site's four runtime files and its
`assets/` directory to `/home/ortheninfo/public_html/`, as shown in the supplied
cPanel screenshots. No build step is required.

1. In **Git Version Control**, clone `MRahmaniT/Orthen` into a directory outside
   `public_html`, for example `/home/ortheninfo/repositories/Orthen`.
   For this private repository, the hosting account must have working GitHub
   authentication; a repository-specific, read-only SSH deploy key is sufficient.
2. Open **Manage**, confirm the checked-out branch is **main**, and select
   **Pull or Deploy**.
3. Click **Update from Remote**. Wait for it to finish successfully.
4. Click **Deploy HEAD Commit**. Check the last-deployment result, then open the
   domain to verify the site.

The deployment copies only `dist/index.html`, `dist/app.js`,
`dist/content.js`, `dist/styles.css`, and `dist/assets/`. It does not copy the
repository, Dockerfile, documentation or Sites manifest into the public folder.
Existing hosting files such as `php.ini`, `.htaccess`, `.well-known/` and
`cgi-bin/` are left in place. Updated site files are overwritten; unused old
assets are not deleted.

A clone managed through cPanel uses **manual pull deployment**: future GitHub
updates require **Update from Remote**, then **Deploy HEAD Commit**. Automatic
deployment is a separate setup and has not been configured.

Reference: [cPanel deployment guide](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-set-up-deployment/).

## Edit

- `dist/content.js`: bilingual company information, six service descriptions, research context, contact details and interface copy.
- `dist/app.js`: rendering, language selection, mobile menu, active navigation, service selection, sharing and printing.
- `dist/styles.css`: logo-derived navy and blue visual system, RTL/LTR layouts, responsive breakpoints, reduced-motion and print styles.
- `dist/assets/`: supplied Orthen marks, a favicon and locally bundled Noto Sans Arabic fonts.

## Features

- Persian/English switching, with `?lang=fa` or `?lang=en` and local language preference persistence.
- Direct service URLs, e.g. `?service=biomechanics&lang=en#services`.
- Six service panels with semantic buttons, pressed state and live announcements.
- Mobile navigation, Escape-to-close, visible focus indicators and skip navigation.
- Copyable service links and a visible result message.
- A printable catalog containing **all six services**, including native browser printing.
- Verified supplied telephone and location, with a working `tel:` link.
- No product photographs, external runtime requests, analytics, forms or server services.

## Template provenance

Based on the implementation methods in [MRahmaniT/APTUS-Catalog](https://github.com/MRahmaniT/APTUS-Catalog), inspected at commit `75c645424c5ac5dba0d27c15e889d07a1aeebf91`:

- Retained the buildless `dist/` layout, module-based content, local fonts and Nginx Docker deployment.
- Adapted language selection, safe string handling, query-string deep links, selectable detail rendering, mobile navigation and scroll-aware active links from `dist/app.js`.
- Replaced the subject-specific content and visual system with Orthen branding and service content. No APTUS product assets are used.

## Content and asset sources

- The user's Orthen brand brief: Orthen = Orthopedic + Engineering; Persian slogan “درک بالینی . دقت مهندسی”. The English slogan is a translation.
- Supplied Orthen banner PDF and contact JPEG: six service categories, telephone `+98 912 73 49 739`, website `www.orthen.info`, and Tehran / Sharif University of Technology / Sattari Complex location.
- Supplied Orthen PNG logos: header, footer and icon assets. Palette comes from the navy and blue logo, rather than the banner's green/cream theme.
- Supplied SOBL information JPEG and Sharif laboratory brochure PDF: biomechanical testing, loading, failure/stiffness assessment, finite element modelling, design support and interdisciplinary collaboration. The research section explicitly describes **SOBL**, rather than claiming the laboratory's founders, team or institutional status belong to Orthen.
- Explanatory service and workflow copy is paraphrased from these materials. No certifications, performance statistics, clinical results, client endorsements, manufacturing methods, or corporate founding claims have been added.

The supplied product photographs and brochure collages are deliberately excluded from the website. Source PDFs are not distributed as web assets.

Noto Sans Arabic is bundled under the SIL Open Font License; see `dist/assets/fonts/OFL-1.1.txt`. Brand materials remain subject to their owners' rights.
