# ✅ Taskr

A minimal, dark-themed task manager built with HTML, CSS, and JavaScript.

## Project Structure

```
Task-Manager/
├── index.html   → App structure and layout
├── style.css    → Dark theme, variables, all component styles
├── app.js       → State management, DOM manipulation, event handling
└── README.md    → You are here
```

## How to Run

No installs, no build tools. Just open `index.html` in your browser.

## Features

- ➕ Add and delete tasks
- 🏷️ Organize tasks by category — Work, Personal, Study, Other
- ✔️ Mark tasks as complete — moves them to the Completed section
- 🔍 Filter tasks by category via the sidebar
- 🔢 Live task counts per category in the sidebar
- 💾 Tasks persist across page refreshes via `localStorage`
- 🎞️ Smooth slide-in animation on new tasks
- 🗑️ Delete button reveals on card hover

## What I Learned Building This

### HTML
- Semantic elements — `<aside>`, `<main>`, `<section>`, `<nav>` and why they matter over plain `<div>`s
- `data-*` attributes (`data-category`) to store metadata on elements for JS to read
- Difference between `<span>` (inline) and `<div>` (block) elements
- Why `<script>` goes at the bottom of `<body>` and not in `<head>`
- `<select>` and `<option>` for dropdowns — `value` vs display text

### CSS
- CSS custom properties (`--variables`) in `:root` for a consistent color system
- `box-sizing: border-box` and why we reset it on everything
- `display: flex` for side-by-side layout and vertical stacking
- `100vh` and why `height: 100%` needs to be set on both `html` and `body`
- `@keyframes` animation — `slideIn` with `opacity` and `translateY`
- `::after` pseudo-element to inject the checkmark without touching HTML
- Attribute selectors — `.task-tag[data-cat="work"]` for per-category colors
- Why `opacity: 0` is used over `display: none` when you need transitions
- `:focus-within` to style a parent when a child is focused
- `border: 1px solid transparent` trick to prevent layout shift on hover

### JavaScript
- `localStorage.getItem` / `setItem` and `JSON.stringify` / `JSON.parse`
- `document.getElementById` and `document.createElement` for DOM manipulation
- `addEventListener` for click and keydown events
- `dataset` property to read `data-` attributes
- Array methods — `filter`, `find`, `forEach`, `unshift`
- Event delegation — one listener on a parent instead of many on children
- `e.target.closest()` to find the right element regardless of what was clicked
- `classList.toggle('class', condition)` for conditional class switching
- Array destructuring — `const [title, sub] = array`
- `!boolean` to flip true/false
- Template literals for dynamic strings

## Credits

**Ernest** — Developer
Built this project from scratch as part of my IT course (Jan–Jul 2026).
Wrote all the HTML, CSS, and JavaScript step by step.

**Claude (Anthropic)** — Teaching Assistant
Guided the build concept by concept — explained every line before it was written,
quizzed me on the concepts after, and never just handed over the code.
Especially helped me understand event delegation, the CSS reset, and localStorage.

**Resources**
- [Google Fonts](https://fonts.google.com) — Syne + DM Mono
- [MDN Web Docs](https://developer.mozilla.org) — JavaScript and CSS reference
