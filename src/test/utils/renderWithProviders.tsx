import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import type { ReactElement, ReactNode } from "react";

// Create a test QueryClient with no retries
function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
			mutations: {
				retry: false,
			},
		},
	});
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
	route?: string;
	queryClient?: QueryClient;
}

/**
 * Custom render function that wraps components with necessary providers
 * - React Router (MemoryRouter)
 * - React Query (QueryClientProvider)
 */
export function renderWithProviders(
	ui: ReactElement,
	{
		route = "/",
		queryClient = createTestQueryClient(),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
			</QueryClientProvider>
		);
	}

	return {
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
		queryClient,
	};
}

// Re-export everything from React Testing Library
// export * from "@testing-library/react";
export { renderWithProviders as render };
