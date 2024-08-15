# React Finder 🗂️

Recreating the interactive Mac OS file explore 'Finder' 🗂️ but this one is for web 🕸️. I recreated most functionalities of Mac OS Finder, including UI and user interactions functionalities and features.

## Motivation

In recently, I really like the UI style call `glassmorphism`. I always wanted to created and use that UI system in my project but I have no chance to use that UI design for some reason. After that, I decided to create that effect in side project by combining with tree data structure. All these idea combining and inspiring from Mac OS UI design system, this `React Finder` project is rise.

## Features

- Beautiful UI design with `Glassmorphism` effect
- Similar behavior and functionalities of Mac OS Finder
- Create, rename and delete file and folder with native features like right click on item
- User's device battery status
- Settings to change background wallpaper
- Others...

## Tech Stack

- NextJS
- TailwindCSS
- ShadcnUI
- Zustand

## Installation

This is purely NextJS frontend project.

1. Clone the repo

```bash
git clone https://github.com/Kei-K23/react-finder.git
```

2. Change directory

```bash
cd react-finder
```

3. Install dependencies

```bash
pnpm install
# or
npm install
```

4. Run project locally

```bash
pnpm run dev
# or
npm run dev
```

5. Setup your own Sentry (optional)

## Todo

- [x] Folder and file create, delete and rename
- [x] Sortable folders and files
- [x] Drag and drop every node
- [x] Add Sentry error management
- [ ] Smooth transition between each nodes
- [ ] Add more functions to right panel action bar like finding folder or file
- [ ] Smooth initial transition state management
- [ ] Code refactoring

## License

This project is licensed under the [MIT License](./LICENSE).
