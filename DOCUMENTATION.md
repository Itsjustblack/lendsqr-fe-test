# Lendsqr Frontend Test - Implementation Documentation

## Project Overview

This project is a frontend implementation for the Lendsqr Admin Console assessment, built to demonstrate production-ready React development with TypeScript. The application includes four main pages: a login page with form validation, a dashboard displaying user statistics, a users list page with advanced filtering and pagination, and a detailed user profile page with localStorage persistence.

The application handles 500 mock user records with interactions including filtering by 6 different criteria (organization, username, email, date, phone, status), column sorting, and pagination with configurable page sizes. All data is fetched from a mock API ([https://www.mockaroo.com/apis]) using MSW (Mock Service Worker) to simulate realistic server behavior.

---

## Technical Stack & Rationale

### Core Technologies

- **React 19 + TypeScript + Vite**: Chosen for easy setup without bloated features that slow down the development server. Vite provides instant HMR and fast builds, while React 19 offers the latest features and TypeScript ensures type safety across the codebase.

- **TanStack Query (React Query)**: Selected for its intelligent caching system and automatic background refetching. Configured with 10-minute stale time and `keepPreviousData` to prevent UI flicker during pagination, providing a smooth user experience.

- **TanStack Table**: Professional-grade table management library that handles complex requirements like multi-column sorting, filtering, and pagination out of the box. Eliminates the need to build these features from scratch.

- **Zustand**: Lightweight state management solution chosen over Redux for its simpler API and less boilerplate. Used for managing global filter state and mobile menu state with a clean action-based pattern.

- **React Hook Form + Zod**: Industry-standard combination for form handling with type-safe validation. Zod schemas automatically infer TypeScript types, reducing code duplication and ensuring runtime validation matches compile-time types.

- **SCSS with SMACSS Architecture**: Provides powerful styling features (variables, mixins, nesting) while maintaining a scalable architecture. SMACSS pattern organizes styles into abstracts, base, components, layout, and pages for long-term maintainability.

---

## Architecture Decisions

### Project Structure

The codebase follows a clear separation of concerns with dedicated directories:

- **components/**: 11 reusable UI components (ActionsMenu, Dropdown, Pagination, UsersTable, etc.)
- **pages/**: 3 main pages (Login, Dashboard, UserDetails)
- **layouts/**: DashboardLayout wrapper with navigation
- **hooks/**: Custom React hooks (useLocalStorage)
- **store/**: Zustand stores for filters and mobile menu
- **libs/**: API client, validation schemas, utilities, constants
- **types/**: TypeScript type definitions
- **styles/**: SMACSS-organized SCSS (abstracts, base, components, layout, pages)

### State Management Strategy

Zustand stores are structured with separated actions from state for scalability. The filter store manages table filters and pagination with custom hooks (`useFilters`, `usePagination`, `useTableActions`) and automatically resets pagination when filters change to prevent confusion.

### Routing Pattern

React Router v7 implements a nested layout pattern where the DashboardLayout wraps protected routes (`/users`, `/users/:id`), eliminating the need to duplicate navigation components across pages.

### SCSS Architecture

Follows SMACSS methodology with:

- **Abstracts**: Design tokens (colors, typography, spacing) and responsive mixins
- **Base**: CSS reset and global typography
- **Components**: Component-specific styles with BEM-like naming
- **Layout**: Navigation and page layout styles
- **Pages**: Page-specific overrides

Mobile-first approach uses min-width breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px) for progressive enhancement.

---

## Key Features Implementation

### Login Page

Implements form validation using React Hook Form with Zod schema validation. Real-time validation provides immediate feedback on email format and required fields. The submit button remains disabled until the form is valid, and successful submission navigates to the dashboard.

### Dashboard

The main content area contains the UsersTable component with full filtering and pagination capabilities.

### Users Table (Advanced Features)

- **Filtering**: Dropdown filter menu with 6 fields - organization, username, email (validated), date picker, phone number (Nigerian format validation), and status dropdown
- **Sorting**: Click on column headers to sort ascending/descending
- **Pagination**: Server-side pagination with page size options [10, 20, 50, 100], page number display with ellipsis (...), and previous/next navigation
- **Actions Menu**: Per-user dropdown with "View Details", "Blacklist User", and "Activate User" options
- **Status Badges**: Color-coded badges (green for active, yellow for pending, gray for inactive, red for blacklisted)
- **Loading States**: Animated spinner during data fetch, "No Users Found" empty state with illustration

### User Details Page

Comprehensive user profile view with animated tabs (General Details, Documents, Bank Details, Loans, Savings, App and System).
Displays users personal information. Data is persisted in localStorage using a custom hook, allowing users to refresh the page without losing details.

### Mobile Responsiveness

Mobile-first SCSS implementation with collapsible sidebar, hamburger menu for navigation, and responsive table layout. All components adapt to screen size using breakpoint mixins.

---

## API & Data Management

### Mock API with MSW

Mock Service Worker intercepts network requests and provides realistic API responses during development and testing. The setup includes a GET `/users` endpoint with pagination support, returning a `PaginatedResponse` with data array, total items, and page information. MSW also provides error handlers for testing various failure scenarios (500, 404, 401, network errors).

### TanStack Query Configuration

Configured with smart defaults:

- `staleTime: 10 minutes` - Data considered fresh for 10 minutes
- `gcTime: 30 minutes` - Cached data garbage collected after 30 minutes
- `retry: 2` - Automatic retry on failure
- `refetchOnWindowFocus: false` - Prevents unnecessary refetches
- `keepPreviousData: true` - Maintains previous page data during pagination for smooth transitions

### Error Handling

Multi-layered approach with API error states triggering error UI, Zod validation providing user-friendly form errors, and localStorage operations wrapped in try-catch blocks with console warnings.

---

## Code Quality & Testing

### Testing Strategy

Comprehensive test suite with **17 test files** covering components, pages, hooks, stores, and utilities. Testing infrastructure includes:

- **Vitest**: Modern, fast test runner with native Vite integration
- **Testing Library**: React component testing with user-centric queries
- **MSW**: API mocking for realistic server behavior in tests
- **Happy DOM**: Lightweight DOM environment for faster tests

Custom test utilities include `renderWithProviders` to wrap components with necessary providers (React Query, Router) and `storageHelpers` for localStorage testing.
Global setup handles MSW server lifecycle and automatic cleanup after each test.

Test coverage includes positive and negative scenarios: successful user interactions, form validation errors, API failures, empty states, loading states, and edge cases.

---

## Notable Technical Decisions

### localStorage Over IndexedDB

Chose localStorage for user details persistence due to simplicity and sufficient capacity for the use case. Implemented a custom `useLocalStorage` hook with TypeScript generics, JSON serialization, error handling, and cross-tab synchronization via storage events.

### Server-Side Pagination

Implemented server-side pagination instead of client-side to handle large datasets efficiently. Query keys include both pagination and filter parameters (`["users", pagination, filters]`) ensuring proper cache invalidation when either changes.

### Nigerian Phone Number Validation

Filter form includes specific validation for Nigerian phone format, matching Lendsqr's target market requirements.

---

## Deployment

**Platform:** Vercel
**Live Demo:** `https://[candidate-name]-lendsqr-fe-test.[platform-domain]`
**GitHub Repository:** https://github.com/[username]/lendsqr-fe-test
