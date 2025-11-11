import { faker } from "@faker-js/faker";
import type { User, UserStatus, IUserDetails } from "@/types/user";

// Generate a single mock user
export function generateMockUser(overrides?: Partial<User>): User {
	const statuses: UserStatus[] = [
		"active",
		"inactive",
		"pending",
		"blacklisted",
	];

	return {
		id: faker.string.uuid(),
		organization: faker.company.name(),
		username: faker.internet.username(),
		email: faker.internet.email(),
		phoneNumber: faker.phone.number(),
		dateJoined: faker.date.past({ years: 2 }),
		status: faker.helpers.arrayElement(statuses),
		...overrides,
	};
}

// Generate multiple mock users
export function generateMockUsers(count: number): User[] {
	return Array.from({ length: count }, () => generateMockUser());
}

// Generate 500 mock users for testing
export const mockUsers = generateMockUsers(500);

// Generate mock user details
export function generateMockUserDetails(
	overrides?: Partial<IUserDetails>
): IUserDetails {
	return {
		personalInfo: {
			fullName: faker.person.fullName(),
			phoneNumber: faker.phone.number(),
			emailAddress: faker.internet.email(),
			bvn: faker.string.numeric(11),
			gender: faker.helpers.arrayElement(["Male", "Female"]),
			maritalStatus: faker.helpers.arrayElement([
				"Single",
				"Married",
				"Divorced",
			]),
			children: faker.helpers.arrayElement(["None", "1", "2", "3+"]),
			typeOfResidence: faker.helpers.arrayElement([
				"Parent's Apartment",
				"Rented Apartment",
				"Own House",
			]),
		},
		education: {
			levelOfEducation: faker.helpers.arrayElement([
				"B.Sc",
				"M.Sc",
				"Ph.D",
				"HND",
			]),
			employmentStatus: faker.helpers.arrayElement([
				"Employed",
				"Unemployed",
				"Self-employed",
			]),
			sectorOfEmployment: faker.helpers.arrayElement([
				"FinTech",
				"Healthcare",
				"Education",
				"Technology",
			]),
			durationOfEmployment: faker.helpers.arrayElement([
				"1 year",
				"2 years",
				"3 years",
				"5+ years",
			]),
			officeEmail: faker.internet.email(),
			monthlyIncome: `₦${faker.number
				.int({ min: 50000, max: 500000 })
				.toLocaleString()} - ₦${faker.number
				.int({ min: 500000, max: 1000000 })
				.toLocaleString()}`,
			loanRepayment: `₦${faker.number
				.int({ min: 10000, max: 100000 })
				.toLocaleString()}`,
		},
		socials: {
			twitter: `@${faker.internet.username()}`,
			facebook: faker.internet.username(),
			instagram: `@${faker.internet.username()}`,
		},
		guarantor: {
			fullName: faker.person.fullName(),
			phoneNumber: faker.phone.number(),
			emailAddress: faker.internet.email(),
			relationship: faker.helpers.arrayElement([
				"Sister",
				"Brother",
				"Friend",
				"Colleague",
			]),
		},
		secondGuarantor: {
			fullName: faker.person.fullName(),
			phoneNumber: faker.phone.number(),
			emailAddress: faker.internet.email(),
			relationship: faker.helpers.arrayElement([
				"Sister",
				"Brother",
				"Friend",
				"Colleague",
			]),
		},
		basicInfo: {
			avatar: faker.image.avatar(),
			name: faker.person.fullName(),
			userId: faker.string.alphanumeric(8).toUpperCase(),
			tier: faker.number.int({ min: 1, max: 3 }),
			bankAccount: faker.string.numeric(10),
			bankName: faker.helpers.arrayElement([
				"GT Bank",
				"Access Bank",
				"First Bank",
				"UBA",
				"Zenith Bank",
			]),
			accountBalance: `₦${faker.number
				.int({ min: 100000, max: 5000000 })
				.toLocaleString()}`,
		},
		...overrides,
	};
}

// Single mock user details for testing
export const mockUserDetails = generateMockUserDetails();
