# Lendsqr Frontend Test

> A production-ready admin dashboard for managing user data, built with React 19, TypeScript, and SCSS for the Lendsqr frontend engineering assessment.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff.svg)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Live Demo:** [View Application](#)

---

## Overview

This application is a feature-rich admin console that demonstrates professional React development practices. It includes user management with advanced filtering and pagination, detailed user profiles with local persistence, and a fully responsive mobile-first design.

### Key Features

- **Authentication Flow**: Form-validated login page with validation error feedback
- **Dashboard**: Statistical overview with user metrics cards
- **Advanced User Table**: Server-side pagination, multi-column sorting, and filtering
- **User Details**: Comprehensive profile view with tabbed navigation and localStorage persistence
- **Mobile Responsive**: Collapsible navigation, hamburger menus, and adaptive layouts
- **500 Mock Users**: Realistic data generation with MSW (Mock Service Worker) & FakerJs

---

## Tech Stack

| Category               | Technologies                                          |
| ---------------------- | ----------------------------------------------------- |
| **Core**               | React 19, TypeScript, Vite                            |
| **State Management**   | Zustand (global state), TanStack Query (server state) |
| **Forms & Validation** | React Hook Form, Zod                                  |
| **UI Components**      | TanStack Table, React Select, Framer Motion           |
| **Styling**            | SCSS with SMACSS architecture                         |
| **Routing**            | React Router v7                                       |
| **Testing**            | Vitest, Testing Library, MSW, Happy DOM, FakerJs      |
| **API Mocking**        | Mock Service Worker (MSW)                             |
| **Dev Tools**          | ESLint, TypeScript Compiler, React Compiler           |

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/itsjustblack/lendsqr-fe-test.git
cd lendsqr-fe-test

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Type-check and build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint checks
npm test          # Run tests in watch mode
npm run test:run  # Run tests once (CI mode)
```

---

## Project Structure

```
lendsqr-fe-test/
├── src/
│   ├── components/        # 11 reusable UI components
│   │   ├── ActionsMenu/   # User action dropdown
│   │   ├── Dropdown/      # Custom dropdown component
│   │   ├── NavBar/        # Top navigation bar
│   │   ├── Pagination/    # Table pagination controls
│   │   ├── UsersTable/    # Main data table with filtering
│   │   └── ...
│   ├── pages/             # Main application pages
│   │   ├── LoginPage.tsx
│   │   ├── Dashboard.tsx
│   │   └── UserDetails.tsx
│   ├── layouts/           # Layout wrappers
│   │   └── DashboardLayout.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useLocalStorage.ts
│   ├── store/             # Zustand state stores
│   │   ├── filters.ts     # Table filter state
│   │   └── mobileMenu.ts  # Mobile navigation state
│   ├── libs/              # Core utilities
│   │   ├── api/           # API client and queries
│   │   ├── validation/    # Zod schemas
│   │   ├── utils.ts       # Utility functions
│   │   └── constants.ts   # App constants
│   ├── types/             # TypeScript definitions
│   │   └── user.ts
│   ├── styles/            # SCSS with SMACSS architecture
│   │   ├── abstracts/     # Variables, mixins, functions
│   │   ├── base/          # Reset, typography
│   │   ├── components/    # Component styles
│   │   ├── layout/        # Navigation, layouts
│   │   └── pages/         # Page-specific styles
│   └── test/              # Test utilities and mocks
│       ├── mocks/         # MSW handlers and mock data
│       └── utils/         # Test helpers
├── public/                # Static assets
│   └── assets/            # Images and icons
└── CLAUDE.md             # AI assistant project context
```

---

## Architecture Highlights

### State Management Strategy

- **Zustand** for global UI state (filters, mobile menu) with action-based patterns
- **TanStack Query** for server state with intelligent caching (10-minute stale time, automatic background refetching)
- **localStorage** for user details persistence with custom hook and cross-tab synchronization

### SCSS Architecture (SMACSS)

Mobile-first approach with organized style layers:

```scss
styles/
├── abstracts/    # Design tokens, mixins, breakpoints
├── base/         # CSS reset, global typography
├── components/   # Component-scoped styles with BEM-like naming
├── layout/       # Navigation and page layouts
└── pages/        # Page-specific overrides
```

**Responsive Breakpoints:**

- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)

### Testing Philosophy

Comprehensive test coverage with **17 test files** covering:

- ✅ Component rendering and user interactions
- ✅ Form validation (positive and negative cases)
- ✅ API integration with MSW
- ✅ State management (Zustand stores)
- ✅ Custom hooks (useLocalStorage)
- ✅ Utility functions
- ✅ Error handling and edge cases

---

## Design Fidelity

This implementation achieves **pixel-perfect accuracy** with the Figma design:

- Exact color values extracted from design tokens
- Precise spacing and typography matching
- Responsive layouts at all breakpoints (mobile, tablet, desktop)
- Interactive states (hover, active, disabled) matching design
- Smooth animations with Framer Motion

**Design Source:** [Figma - Lendsqr Frontend Testing](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend)

---

## Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:run -- --coverage
```

**Test Coverage:**

- 17 test files across components, pages, hooks, and stores
- Positive and negative scenario testing
- API mocking with MSW
- Custom test utilities for consistent setup

---

## Deployment

### Build for Production

```bash
npm run build
```

This runs TypeScript compilation (`tsc -b`) followed by Vite's optimized production build. Output is in the `dist/` directory.

### Deployment Platforms

This app can be deployed to any static hosting service:

- **Vercel**: Connect GitHub repo and deploy automatically
- **Netlify**: Drag-and-drop `dist/` folder or connect repo
- **Heroku**: Use static buildpack
- **GitHub Pages**: Configure with `gh-pages` package

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

## Development Notes

### TypeScript Configuration

- Strict mode enabled
- No unused locals/parameters allowed
- Module resolution: "bundler"
- Path aliases: `@/*` → `./src/*`

### ESLint Rules

- TypeScript ESLint recommended rules
- React Hooks rules (recommended-latest)
- React Refresh plugin for Vite HMR

---

## Code Quality Standards

This project follows industry best practices:

- ✅ TypeScript strict mode with comprehensive type safety
- ✅ Consistent naming conventions (camelCase for variables, PascalCase for components)
- ✅ Clear component structure with single responsibility principle
- ✅ Semantic HTML with proper accessibility attributes
- ✅ BEM-like CSS naming for maintainability
- ✅ Comprehensive error handling with user-friendly messages
- ✅ Clean git history with conventional commit messages
- ✅ Extensive test coverage (unit and integration tests)

---

## Contributing

This is an assessment project, but feedback is welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## Acknowledgments

- **TanStack** for excellent data management libraries
- **Vite** for blazing-fast development experience
- **React Community** for comprehensive documentation and tools

---

## Contact

For questions about this implementation:

- **GitHub Issues**: [Create an issue](https://github.com/itsjustblack/lendsqr-fe-test/issues)

---
