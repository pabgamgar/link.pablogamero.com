# Project Overview

This is a web project built with the [Astro](https://astro.build/) framework. It appears to be a simple website with a few pages, styled with [Tailwind CSS](https://tailwindcss.com/). The project is configured to use Vite for the development server and build process.

The website seems to be a personal project, possibly for sharing "gift" experiences, as suggested by the filenames `regalo-madrid.astro` and `regalo-viena.astro`.

# Building and Running

The following commands are used to work with the project:

*   **Install dependencies:**
    ```bash
    pnpm install
    ```
*   **Start the development server:**
    ```bash
    pnpm dev
    ```
    This will start a local development server at `http://localhost:4321`.
*   **Build the project:**
    ```bash
    pnpm build
    ```
    This will build the production-ready website in the `dist/` directory.
*   **Preview the build:**
    ```bash
    pnpm preview
    ```
    This will start a local server to preview the built website.

# Development Conventions

*   **Framework:** The project uses the [Astro](https://astro.build/) framework.
*   **Styling:** Styling is done with [Tailwind CSS](https://tailwindcss.com/).
*   **Structure:**
    *   Pages are located in the `src/pages` directory.
    *   Layouts are in `src/layouts`.
    *   Global styles are in `src/styles`.
    *   Static assets are in the `public` directory.
*   **Components:** The project uses Astro components, which are a mix of HTML, JavaScript, and CSS. The `.astro` files in `src/layouts` and `src/pages` are examples of these components.
