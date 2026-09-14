# Saku Hukum ULM

A bilingual (Bahasa Indonesia / English) cheat-sheet and informational website for **Universitas Lambung Mangkurat (ULM), Faculty of Law, Prosecutor Track**. 

This project is built to serve as a fast, accessible, and user-friendly portal for prospective and current students looking for information on admissions, curriculum, faculty/staff, campus life, schedules, and events related to the Prosecutor track.

## Tech Stack
- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Radix UI (for accessible components) + Framer Motion (for animations)
- **Routing**: Wouter
- **Language Setup**: React Context-based bilingual toggle (ID as default, EN as secondary)
- **Package Manager**: pnpm (or npm)

## Folder Structure
```
SakuHukumULM/
├── client/
│   ├── public/         # Static assets (images, icons)
│   └── src/
│       ├── components/ # Reusable UI components (buttons, search bar, chatbot UI)
│       ├── contexts/   # React contexts (e.g., Language Context)
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # Utilities and helpers
│       ├── pages/      # Route components (Home, About, Curriculum, etc.)
│       ├── App.tsx     # Main application layout and routing
│       └── index.css   # Global Tailwind styles and design system variables
├── server/             # Backend (Express API, if integrated)
├── shared/             # Shared types/schemas (Zod) between client and server
└── ...
```

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   This will start the Vite dev server, typically accessible at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run start
   ```

## How to Add New Content / Pages

### 1. Adding/Modifying Text (Bilingual)
If you need to update text on an existing page (like `Curriculum.tsx`), open the component and look for the translation logic. Text is usually handled dynamically based on the active language (`id` or `en`) provided by the language context.
- Keep the language simple, practical, and non-academic.

### 2. Creating a New Page
1. Create a new `.tsx` file in `client/src/pages/` (e.g., `NewPage.tsx`).
2. Follow the existing UI patterns (use components from `@/components`).
3. Add bilingual support for all text elements.
4. Open `client/src/App.tsx` and add a new Wouter `<Route>` pointing to your new page.
5. Update navigation links in the Sidebar/Header component to include your new route.

### 3. Adding Images
- Place new images in `client/public/` or an appropriate subfolder.
- **Crucial**: Always optimize and compress images (WebP format preferred) and use appropriate sizing and lazy loading (`loading="lazy"`) in `<img>` tags to maintain fast load times.

## Design System & Consistency
This project strictly adheres to a predefined design system. When adding new components:
- Rely on Tailwind utility classes combined with the `index.css` CSS variables.
- Maintain existing spacing, typography, and color usage rules.
- Test changes on mobile to ensure responsiveness and a native-app-like feel.

---
*Maintained for ULM Faculty of Law, Prosecutor Track.*


## Data Sources (Updated 14 Sep 2026)
- IDN Times Kaltim (Accreditation news)
- Jejakrekam.com (Alumni response)
- Blogspot (Student review 2019)
- LinkedIn (Fresh graduate testimonial)
- ULM Official SK Rektor No. 274/UN8/HK.06/2026 (Academic Calendar)
- Kejaksaan RI & FH ULM News (Adhyaksa Chamber)