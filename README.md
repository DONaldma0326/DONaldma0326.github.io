# Portfolio + Blog (Astro + GitHub Pages)

A polished portfolio website that is free to host on GitHub Pages.

## Tech stack

- **Framework:** Astro
- **Styling:** Template-based Astro UI + CSS (easy to customize)
- **Content:** Markdown collections
  - `src/content/projects` for project pages
  - `src/content/blog` for blog posts
- **Hosting:** GitHub Pages (free)
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`)

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

## Edit your content

### Add or update a project

1. Create or edit a Markdown file in `src/content/projects`.
2. Use this frontmatter format:

```md
---
title: Project Title
description: Short summary
publishDate: 2026-07-12
tags:
  - Astro
  - TypeScript
img: /assets/stock-1.jpg
img_alt: Image description
---
```

### Add or update a blog post

1. Create or edit a Markdown file in `src/content/blog`.
2. Use this frontmatter format:

```md
---
title: Post Title
description: Short summary
publishDate: 2026-07-12
tags:
  - Notes
---
```

## Personalize profile details

Update placeholders in:

- `src/components/Nav.astro` (name + social links)
- `src/components/Footer.astro` (name + social links)
- `src/components/ContactCTA.astro` (email)
- `src/pages/index.astro` and `src/pages/about.astro` (intro text)

## Free deployment on GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Source**, choose **GitHub Actions**.
4. Push to `main` branch.

The workflow will build and deploy automatically.

## Build command

```bash
npm run build
```
