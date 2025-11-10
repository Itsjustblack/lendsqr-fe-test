import type { AxiosError } from "axios";
import type { PaginatedResponse, QueryParams, User } from "../../../types/user";
import apiClient from "../client";
import { flattenQueryParams } from "../../utils";

export async function getAllUsers(params?: QueryParams) {
	try {
		const res = await apiClient.get<PaginatedResponse<User>>("/users", {
			params: flattenQueryParams(params),
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
