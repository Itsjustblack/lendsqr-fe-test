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

export interface UserDetails {
	personalInfo: {
		fullName: string;
		phoneNumber: string;
		emailAddress: string;
		bvn: string;
		gender: string;
		maritalStatus: string;
		children: string;
		typeOfResidence: string;
	};
	education: {
		levelOfEducation: string;
		employmentStatus: string;
		sectorOfEmployment: string;
		durationOfEmployment: string;
		officeEmail: string;
		monthlyIncome: string;
		loanRepayment: string;
	};
	socials: {
		twitter: string;
		facebook: string;
		instagram: string;
	};
	guarantor: {
		fullName: string;
		phoneNumber: string;
		emailAddress: string;
		relationship: string;
	};
	secondGuarantor: {
		fullName: string;
		phoneNumber: string;
		emailAddress: string;
		relationship: string;
	};
	basicInfo: {
		avatar?: string;
		name: string;
		userId: string;
		tier: number;
		bankAccount: string;
		bankName: string;
		accountBalance: string;
	};
}