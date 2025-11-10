import type { FilterFormValues } from "../libs/validation/filterSchema";

export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface User {
	id: string;
	organization: string;
	username: string;
	email: string;
	phoneNumber: string;
	dateJoined: Date;
	status: UserStatus;
}

export interface PaginatedResponse<T> {
	data: T[];
	totalItems: number;
	page: number;
	pageSize: number;
	pageCount: number;
}

export interface QueryParams {
	filters?: FilterFormValues;
	pagination?: {
		page: number;
		pageSize: number;
	};
}
