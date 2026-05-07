# LuxeEstate

A Vite + React real-estate application with public browsing, authenticated user features, and an admin area for property management. The app uses Redux for state management, React Router for navigation, and Supabase for authentication and data access.

## Overview

The app is organized around three main experiences:

- Public pages for browsing properties, searching listings, viewing property details, learning about the platform, and contacting the team.
- Authenticated user pages for favourites, live favourite counts, recently viewed properties, and profile management.
- Admin pages for dashboard analytics, adding properties, editing listings, viewing property details in modals, deleting listings, and managing settings.

It also includes route protection, theme switching, and an offline fallback page.

## Features

- Property listing and property detail pages
- Search and filter controls for browsing properties by title, type, price, bedrooms, city, and address
- Property details image gallery with extra gallery image support
- Favourite properties for logged-in users
- Live favourite count badge in the main navigation
- Recently viewed properties on the profile page
- Login and sign-up flows backed by Supabase Auth
- Profile page and edit profile flow
- Admin dashboard with total properties, users, favourites, quick actions, and recent listings
- Admin property creation with validation
- Admin property management table with search, sorting, view modal, edit modal, and delete confirmation
- Admin settings for profile data, platform information, theme switching, and logout
- Protected, public, user-only, and admin-only routes
- Light/dark theme support
- Responsive layout for desktop, tablet, and mobile screens
- Offline redirect and fallback screen
- Not found pages for unknown user and admin routes

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit
- Supabase
- Tailwind CSS 4
- Bootstrap
- Formik and Yup for form handling and validation
- Lucide React and React Icons for icons

## Project Structure

- `src/App.jsx` wires the main routes and layout.
- `src/components/` contains shared UI and route guards.
- `src/features/` contains page-level features such as home, listing, auth, profile, and admin.
- `src/Redux/` contains the store and Redux slices.
- `src/config/` contains Supabase client and API helpers.
- `src/services/` contains property data service helpers.
- `src/theme/` contains theme state and persistence helpers.
- `src/constants/` contains shared values such as property type options.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A Supabase project with auth enabled
- Supabase tables for `profiles`, `properties`, `property_images`, and `favorites`

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Main Routes

- `/` home
- `/about` about page
- `/contact_us` contact page
- `/listing` property listings
- `/listing/:id` property details
- `/favourite` favourites for signed-in users
- `/profile` user profile
- `/login` login
- `/signup` sign-up
- `/admin` admin dashboard
- `/admin/dashboard` admin dashboard
- `/admin/add-property` add a new property
- `/admin/properties` manage, view, edit, and delete properties
- `/admin/settings` admin profile and platform settings
- `/admin/*` admin not found page
- `/offline` offline screen
- `*` public not found page

## Notes

- The app restores authentication state from the saved token on load.
- Favourite data is loaded after login and updates live when a property is added or removed.
- The listing location filter searches both `city` and `address`.
- Public auth pages redirect authenticated users away from login/sign-up.
- Admin users are redirected away from user-only pages.
- Admin routes are separated from user routes and protected by route guards.
- Deleting an admin property also removes related gallery images and favourites.
