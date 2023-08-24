# Full Stack Airbnb Clone with Next.js 13.4

## Table of contents

- [Overview](#overview)
  - [Screencast](#screencast)
  - [Links](#links)
  - [Getting started](#getting-started)
- [My process](#my-process)
    - [Decisions](#decisions)
  - [Organization](#organization)
  - [Built with](#built-with)
  - [Continued Development](#continued-development)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This is a repository for a Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth.

#### Design

    ✓ Ensured responsiveness on devices with widths ranging from 320px to 1920px, in both portrait and landscape orientations.
    ✓ Proper application of fonts, colors, sizes, spacing, illustrations, icons, text, and images.
    ✓ Appropriate behavior of buttons and links on hover or when receiving focus.
    ✓ Smooth animations during state transitions.
    ✓ Image gallery with responsive behavior.
    ✓ Adaptable and fluid text and spacing.

#### Feactures

- [x] Full responsiveness
- [x] Credential authentication
- [x] Google and Github authentication
- [x] Image upload using Cloudinary CDN
- [x] Client form validation and handling using react-hook-form
- [x] Server error handling using radix UI toast
- [x] Calendars with react-date-range
- [x] Page loading state
- [x] Page empty state
- [x] Booking / Reservation system
- [x] Guest reservation cancellation
- [x] Owner reservation cancellation
- [x] Creation and deletion of properties
- [x] Pricing calculation
- [x] Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
- [x] Favorites system
- [x] Shareable URL filters
- [ ] Edit properties
- [ ] Edit profile
- [ ] Automated testing
- [ ] Not found page

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Remote repository](https://github.com/trelcray/airbnb-clone)

- [Live preview](https://trelcray-airbnb-clone.vercel.app)

### Getting started

You can use the application available at the live preview URL above. However, if you want to build it on your machine:

#### Prerequisites

Make sure your machine has Node 18+ installed and the package manager npm.

Make sure you have installed the ESlint extension.

#### Installation

Clone the project repository to your machine.

Using HTTPS:
```bash
https://github.com/trelcray/airbnb-clone.git
```

Using GitHub CLI:
```bash
gh repo clone trelcray/airbnb-clone
```

Navigate to the newly downloaded directory.

```bash
cd airbnb-clone
```

Install the project dependencies using npm or an of your preference:

```bash
npm install
```

### Setup .env file

```bash
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=
```

#### Development

To run the project in development mode, execute the command:

```bash
npm run dev
```

This will start the development server at http://localhost:3000. Open your browser and paste the address to view the application.

#### Building for Production

To build the project for production, execute the command:

```bash
npm run build
```

This will generate an optimized and minified version of the application in the .next folder.

#### Running in Production Mode

After building the project, you can start a production mode server by executing the command:

```bash
npm run start
```

This will start the production server at the same address http://localhost:3000. Open your browser and paste the address to view the optimized application.

## My process

### Decisions

Firstly, I analyzed the project scope and its requirements. After a careful evaluation, I decided on the technologies to use and created the initial project setup, incorporating everything I had planned to utilize.

After that, I began developing the components and the static part of the application. Subsequently, I implemented the required functionalities. After completing this phase, I introduced integration with the API and performed refactorings to ensure code quality.

Finally, I deployed the application and analyzed the SEO, making necessary changes to enhance search engine optimization.

### Organization

Next.js is a framework that has its own folder structure standard, which underwent a significant change in version 13.4. In my project, I faithfully follow these standards and use the "src" folder to contain project-specific files. Additionally, I choose to separate files according to their responsibilities into folders that make their functionalities explicit.

### Built with

#### Technologies, libraries, and tools

- TypeScript
- React.js
- Next.js
- Prisma
- Next-auth
- Radix UI
- React-hook-form
- Zod
- Tailwind CSS
- Clsx
- Tailwind-merge
- Class-variance-authority
- Axios
- Zustand
- Husky
- Prettier
- ESlint
- React-icons
- Date-fns
- World-countries
- Leaflet
- Query-string

#### Techniques, concepts and more

- Mobile-first workflow
- Semantic HTML5 markup
- Flexbox / Grid
- SSR / CSR / SSG
- Hoc / Render Props
- Preload / Prefetch
- Provider

### Continued development

1. Unit, Integration, and E2E tests.

2. Edit the properties.

3. Edit user profile. 

### What I learned

1. How to reuse components in a more comprehensive way.

2. How to properly use modals and toasts, using providers.

3. Creating dynamic SEO.

4. How to perform authentication with Next-Auth.

### Useful resources

1. [Images Optmization](https://tinypng.com/)

2. [Icons SEO converter](https://favicon.io/favicon-converter/)

## Author

- GitHub - [trelcray](https://github.com/trelcray)

- LinkedIn - [Thalis Zambarda](https://www.linkedin.com/in/thalis-zambarda/)

## Acknowledgments

I thank [Antonio](https://github.com/AntonioErdeljac) for sharing his knowledge non-profitably and for sharing amazing open-source projects.
