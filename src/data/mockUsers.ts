import type { User, UserStatus } from "../types/user";

// Helper function to generate mock users
const generateMockUsers = (): User[] => {
	const organizations = [
		"Lendsqr",
		"Lendstar",
		"Irorun",
		"Creditville",
		"PayFlow",
		"FinTech Hub",
	];

	const firstNames = [
		"Adedeji",
		"Debby",
		"Grace",
		"Tosin",
		"Chioma",
		"Oluwaseun",
		"Emeka",
		"Ngozi",
		"Aisha",
		"Ibrahim",
		"Funmi",
		"Chinedu",
		"Blessing",
		"Victor",
		"Amara",
		"Tunde",
		"Folake",
		"Ayo",
		"Chiamaka",
		"Adebayo",
		"Yemi",
		"Kemi",
		"Segun",
		"Nkechi",
		"Femi",
		"Bukola",
		"Kunle",
		"Ogechi",
		"Samuel",
		"Joy",
		"Daniel",
		"Patience",
		"Michael",
		"Stella",
		"David",
		"Rita",
		"John",
		"Mary",
		"James",
		"Sarah",
	];

	const lastNames = [
		"Adebayo",
		"Ogana",
		"Effiom",
		"Dokunmu",
		"Ayo",
		"Okafor",
		"Eze",
		"Nwosu",
		"Hassan",
		"Bello",
		"Adeleke",
		"Okoro",
		"Okonkwo",
		"Obi",
		"Chukwu",
		"Afolabi",
		"Olaniyan",
		"Oyebola",
		"Nnamdi",
		"Williams",
		"Johnson",
		"Brown",
		"Davis",
		"Wilson",
		"Moore",
		"Taylor",
		"Anderson",
		"Thomas",
		"Jackson",
		"White",
	];

	const users: User[] = [];

	for (let i = 1; i <= 120; i++) {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${
			i > 40 ? i : ""
		}`;
		const organization =
			organizations[Math.floor(Math.random() * organizations.length)];
		const orgDomain = organization.toLowerCase().replace(/\s+/g, "");

		// Generate random phone number
		const phoneDigits = Math.floor(Math.random() * 900000000) + 100000000;
		const phoneNumber = `+234 ${phoneDigits
			.toString()
			.slice(0, 3)} ${phoneDigits.toString().slice(3, 6)} ${phoneDigits
			.toString()
			.slice(6, 10)}`;

		// Generate random date between 2019 and 2024
		const startDate = new Date("2019-01-01").getTime();
		const endDate = new Date("2024-12-31").getTime();
		const randomDate = new Date(
			startDate + Math.random() * (endDate - startDate)
		);

		// Weight statuses: 60% Active, 20% Inactive, 15% Pending, 5% Blacklisted
		let status: UserStatus;
		const rand = Math.random();
		if (rand < 0.6) {
			status = "active";
		} else if (rand < 0.8) {
			status = "inactive";
		} else if (rand < 0.95) {
			status = "pending";
		} else {
			status = "blacklisted";
		}

		users.push({
			id: i.toString(),
			organization,
			username,
			email: `${username}@${orgDomain}.com`,
			phoneNumber,
			dateJoined: randomDate,
			status,
		});
	}

	return users;
};

export const mockUsers: User[] = generateMockUsers();
