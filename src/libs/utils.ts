import type { QueryParams } from "../types/user";
import { ELLIPSIS, MAX_VISIBLE_PAGES, PAGE_THRESHOLD } from "./constants";

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export function formatDate(date: Date): string {
	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // 0 should be 12
	const minutesStr = minutes < 10 ? "0" + minutes : minutes;

	return `${month} ${day}, ${year} ${hours}:${minutesStr} ${ampm}`;
}

export function flattenQueryParams(params?: QueryParams) {
	if (!params) return {};
	return {
		...params.filters,
		...params.pagination,
	};
}

export const generatePageNumbers = (pageCount: number, currentPage: number) => {
	// Edge case: no pages to display
	if (pageCount === 0) return [];

	// Show all pages if count is within threshold
	if (pageCount <= MAX_VISIBLE_PAGES) {
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}

	// Near the beginning (pages 1-3)
	if (currentPage <= PAGE_THRESHOLD) {
		return [1, 2, 3, 4, ELLIPSIS, pageCount];
	}

	// Near the end (last 3 pages)
	if (currentPage >= pageCount - PAGE_THRESHOLD + 1) {
		return [
			1,
			ELLIPSIS,
			pageCount - 3,
			pageCount - 2,
			pageCount - 1,
			pageCount,
		];
	}

	// In the middle - show current page with context
	return [
		1,
		ELLIPSIS,
		currentPage - 1,
		currentPage,
		currentPage + 1,
		ELLIPSIS,
		pageCount,
	];
};
