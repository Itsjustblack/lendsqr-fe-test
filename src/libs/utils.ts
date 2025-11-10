import type { QueryParams } from "../types/user";

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
