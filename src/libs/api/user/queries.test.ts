import {
	emptyResponseHandler,
	networkErrorHandler,
	notFoundHandler,
	serverErrorHandler,
	unauthorizedHandler,
} from "@/test/mocks/handlers";
import { describe, expect, it } from "vitest";
import { mockUsers } from "../../../test/mocks/mockData";
import { server } from "../../../test/mocks/server";
import { getAllUsers } from "./queries";
import { http, HttpResponse } from "msw";

describe("getAllUsers", () => {
	describe("successful requests", () => {
		it("should fetch users without any parameters", async () => {
			const result = await getAllUsers();

			expect(result).toBeDefined();
			expect(result.data).toBeInstanceOf(Array);
			expect(result.totalItems).toBe(mockUsers.length);
			expect(result.page).toBe(1);
			expect(result.pageSize).toBe(10);
		});

		it("should fetch users with pagination parameters", async () => {
			const result = await getAllUsers({
				pagination: {
					page: 2,
					pageSize: 5,
				},
			});

			expect(result.page).toBe(2);
			expect(result.pageSize).toBe(5);
			expect(result.data.length).toBeLessThanOrEqual(5);
		});

		it("should fetch users with filter parameters", async () => {
			const result = await getAllUsers({
				filters: {
					organization: "Test Org",
					status: "active",
				},
			});

			expect(result).toBeDefined();
			expect(result.data).toBeInstanceOf(Array);
		});

		it("should fetch users with both pagination and filter parameters", async () => {
			const result = await getAllUsers({
				pagination: {
					page: 1,
					pageSize: 20,
				},
				filters: {
					username: "test",
					email: "test@example.com",
				},
			});

			expect(result).toBeDefined();
			expect(result.page).toBe(1);
			expect(result.pageSize).toBe(20);
		});

		it("should return correct pagination metadata", async () => {
			const pageSize = 10;
			const result = await getAllUsers({
				pagination: {
					page: 1,
					pageSize,
				},
			});

			expect(result.pageCount).toBe(Math.ceil(mockUsers.length / pageSize));
			expect(result.totalItems).toBe(mockUsers.length);
		});

		it("should handle empty result set", async () => {
			server.use(emptyResponseHandler);

			const result = await getAllUsers();

			expect(result.data).toEqual([]);
			expect(result.totalItems).toBe(0);
			expect(result.pageCount).toBe(0);
		});
	});

	describe("error handling", () => {
		it("should throw AxiosError on 500 server error", async () => {
			server.use(serverErrorHandler);

			await expect(getAllUsers()).rejects.toThrow();
		});

		it("should throw AxiosError on 404 not found", async () => {
			server.use(notFoundHandler);

			await expect(getAllUsers()).rejects.toThrow();
		});

		it("should throw AxiosError on 401 unauthorized", async () => {
			server.use(unauthorizedHandler);

			await expect(getAllUsers()).rejects.toThrow();
		});

		it("should throw AxiosError on network error", async () => {
			server.use(networkErrorHandler);

			await expect(getAllUsers()).rejects.toThrow();
		});

		describe("Malformed Response - Negative Scenarios", () => {
			it("should handle malformed pagination metadata", async () => {
				const malformedPaginationHandler = http.get(
					`${import.meta.env.VITE_API_URL}/users`,
					() => {
						return HttpResponse.json({
							data: mockUsers,
							// Missing pagination fields
							page: "invalid", // String instead of number
							pageSize: null,
						});
					}
				);
				server.use(malformedPaginationHandler);

				const result = await getAllUsers();
				// Should handle gracefully even with malformed pagination
				expect(result.data).toBeInstanceOf(Array);
			});

			it("should handle users array with invalid data types", async () => {
				const invalidDataHandler = http.get(
					`${import.meta.env.VITE_API_URL}/users`,
					() => {
						return HttpResponse.json({
							data: ["not an object", 123, null, { invalid: "user" }],
							totalItems: 4,
							page: 1,
							pageSize: 10,
						});
					}
				);
				server.use(invalidDataHandler);

				const result = await getAllUsers();
				// Should handle gracefully - validation happens at runtime
				expect(result.data).toBeInstanceOf(Array);
			});
		});
	});

	describe("parameter handling", () => {
		it("should handle undefined parameters", async () => {
			const result = await getAllUsers(undefined);

			expect(result).toBeDefined();
			expect(result.data).toBeInstanceOf(Array);
		});

		it("should handle empty filters object", async () => {
			const result = await getAllUsers({
				filters: {},
			});

			expect(result).toBeDefined();
		});

		it("should handle all filter fields", async () => {
			const result = await getAllUsers({
				filters: {
					organization: "Test Org",
					username: "testuser",
					email: "test@example.com",
					date: "2024-01-01",
					phoneNumber: "1234567890",
					status: "active",
				},
			});

			expect(result).toBeDefined();
		});
	});
});
