"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";

type ErrorResponse = { error: string; message: string };

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError<ErrorResponse>;
	}
}

export default function ReactQueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [client] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 10 * 60 * 1000, // 10 minutes
						gcTime: 30 * 60 * 1000, // 30 minutes
						retry: 2,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
