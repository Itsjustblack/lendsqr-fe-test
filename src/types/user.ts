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
