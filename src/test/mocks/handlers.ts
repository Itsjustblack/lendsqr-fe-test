import { http, HttpResponse } from "msw";
import { mockUsers } from "./mockData";
import type { PaginatedResponse, User } from "@/types/user";

export const BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

export const handlers = [
	// GET /users - Success scenario
	http.get(`${BASE_URL}/users`, ({ request }) => {
		const url = new URL(request.url);
		const page = parseInt(url.searchParams.get("page") || "1");
		const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedData = mockUsers.slice(startIndex, endIndex);

		const response: PaginatedResponse<User> = {
			data: paginatedData,
			totalItems: mockUsers.length,
			page,
			pageSize,
			pageCount: Math.ceil(mockUsers.length / pageSize),
		};

		return HttpResponse.json(response);
	}),
];

// Individual error handlers for testing error scenarios
// Use these with server.use() to override the default handler for specific tests

export const serverErrorHandler = http.get(`${BASE_URL}/users`, () => {
	return HttpResponse.json(
		{ message: "Internal Server Error" },
		{ status: 500 }
	);
});

export const notFoundHandler = http.get(`${BASE_URL}/users`, () => {
	return new HttpResponse(null, {
		status: 404,
		statusText: "Not Found",
	});
});

export const unauthorizedHandler = http.get(`${BASE_URL}/users`, () => {
	return new HttpResponse(null, {
		status: 401,
		statusText: "Unauthorized",
	});
});

export const networkErrorHandler = http.get(`${BASE_URL}/users`, () => {
	return HttpResponse.error();
});

export const emptyResponseHandler = http.get(`${BASE_URL}/users`, () => {
	return HttpResponse.json({
		data: [],
		totalItems: 0,
		page: 1,
		pageSize: 10,
		pageCount: 0,
	});
});
