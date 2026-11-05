# Arium Networks — Web Application

Modern, high-performance web platform for **Arium Networks**, built with [Next.js](https://nextjs.org/) App Router, React 19, TypeScript, and Tailwind CSS.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript 5
- **Library:** React 19
- **Styling:** Tailwind CSS v4, Lucide Icons, Radix UI Primitives
- **Forms & Validation:** React Hook Form, Zod
- **CMS Integration:** Strapi Headless CMS (Dynamic Zones & REST API)
- **Email Delivery:** Resend API
- **Analytics & Consent:** Google Analytics (GA4), CookieYes

---

## 🏛️ Architecture & Core Principles

The project follows a strict 4-layer architecture ensuring 100% presentation purity and offline reliability:

```
[Strapi CMS API / Dynamic Zones]
               ↓
[Centralized Fallback Layer] (data/*.data.ts)
               ↓
[Pure 1-to-1 Mappers] (services/mappers/*.mapper.ts)
               ↓
[UI Components & Layout] (components/ui-common, ui-component, ui-widget)
```

1. **4-Layer Contract:**
   - Raw CMS payloads are mapped through dedicated, strongly typed mappers.
   - If CMS data is missing or offline, pages seamlessly fallback to centralized static data.
2. **Component Purity:**
   - Presentational UI components in `components/ui-common` and `components/ui-component` contain zero raw API calls and zero hardcoded fallback data arrays.
3. **Dynamic Widget Registry:**
   - CMS dynamic zone widgets are registered under canonical `shared.*` keys in `components/ui-widget/registry.ts`.
   - `GlobalWidgetRenderer` dynamically resolves and renders widgets with layout grouping.
4. **Responsive Layouts & Containers:**
   - Standardized horizontal fluid gutters and responsive boundaries via `@ui-layout/SectionContainer`.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── [slug]/           # Dynamic page router
│   ├── api/contact/      # Server route handler for contact form (Resend)
│   └── ...               # Page routes (about, solutions, careers, etc.)
├── components/
│   ├── ui-animations/    # Canvas and flow background visual effects
│   ├── ui-common/        # Shared presentation sections (Hero, CTA, Testimonials, etc.)
│   ├── ui-component/     # Domain-specific section components
│   ├── ui-element/       # Reusable base elements (buttons, modals, badges)
│   ├── ui-layout/        # Navbar, Footer, SectionContainer design tokens
│   ├── ui-svg/           # Custom SVG illustration components
│   └── ui-widget/        # Dynamic zone widget renderers & component registry
├── data/                 # Centralized fallback content datasets
├── services/mappers/     # 1-to-1 pure data transformation mappers
├── hooks/                # Custom React animation & interaction hooks
├── lib/                  # Strapi API clients, utilities, and helper functions
├── utils/                # Media URL resolvers, widget builder, SEO helpers
├── types/                # Canonical TypeScript interfaces & CMS schemas
└── public/               # Static assets, fonts, icons, illustrations, and videos
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js:** `v20.x` or higher
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd arium-website-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Copy the sample environment file to create your local `.env`:

```bash
cp .env.example .env
```

Configure the following variables in `.env` (refer to `.env.example` for variable names):

| Variable                   | Description                             |
| :------------------------- | :-------------------------------------- |
| `NEXT_PUBLIC_STRAPI_URL`   | Base URL of the Strapi CMS backend      |
| `RESEND_API_KEY`           | API secret key for Resend email service |
| `RESEND_API_URL`           | Resend API endpoint                     |
| `CONTACT_EMAIL_FROM`       | Verified sender email address           |
| `CONTACT_EMAIL_TO`         | Target recipient email address(es)      |
| `NEXT_PUBLIC_GA_ID`        | Google Analytics 4 Measurement ID       |
| `NEXT_PUBLIC_COOKIEYES_ID` | CookieYes script client ID              |

> **Note:** Never commit actual environment secret values to version control. Keep `.env` gitignored.

---

## 💻 Development & Build Scripts

| Command                | Description                                         |
| :--------------------- | :-------------------------------------------------- |
| `npm run dev`          | Starts local Next.js development server (Turbopack) |
| `npm run build`        | Builds optimized production bundle                  |
| `npm run start`        | Runs production server                              |
| `npm run lint`         | Runs ESLint checks                                  |
| `npm run format`       | Formats all files using Prettier                    |
| `npm run format:check` | Verifies code formatting with Prettier              |
| `npx tsc --noEmit`     | Validates TypeScript type safety with 0 errors      |

---

## 📐 TypeScript Path Aliases

This project uses configured path aliases defined in `tsconfig.json`:

- `@ui-common` ➔ `components/ui-common`
- `@ui-component/*` ➔ `components/ui-component/*`
- `@ui-widget` ➔ `components/ui-widget`
- `@ui-layout/*` ➔ `components/ui-layout/*`
- `@ui-element` ➔ `components/ui-element`
- `@ui-svg/*` ➔ `components/ui-svg/*`
- `@data/*` ➔ `data/*`
- `@services/mappers` ➔ `services/mappers`
- `@lib/*` ➔ `lib/*`
- `@utils` ➔ `utils`
- `@types` ➔ `types`
