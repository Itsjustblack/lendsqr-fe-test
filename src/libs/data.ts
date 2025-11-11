import type { IUserDetails } from "../types/user";

export const mockUserDetails: IUserDetails = {
	personalInfo: {
		fullName: "Grace Effiom",
		phoneNumber: "07060780922",
		emailAddress: "grace@gmail.com",
		bvn: "07060780922",
		gender: "Female",
		maritalStatus: "Single",
		children: "None",
		typeOfResidence: "Parent's Apartment",
	},
	education: {
		levelOfEducation: "B.Sc",
		employmentStatus: "Employed",
		sectorOfEmployment: "FinTech",
		durationOfEmployment: "2 years",
		officeEmail: "grace@lendsqr.com",
		monthlyIncome: "₦200,000.00- ₦400,000.00",
		loanRepayment: "40,000",
	},
	socials: {
		twitter: "@grace_effiom",
		facebook: "Grace Effiom",
		instagram: "@grace_effiom",
	},
	guarantor: {
		fullName: "Debby Ogana",
		phoneNumber: "07060780922",
		emailAddress: "debby@gmail.com",
		relationship: "Sister",
	},
	secondGuarantor: {
		fullName: "Debby Ogana",
		phoneNumber: "07060780922",
		emailAddress: "debby@gmail.com",
		relationship: "Sister",
	},
	basicInfo: {
		name: "Grace Effiom",
		userId: "LSQFf587g90",
		tier: 1,
		bankAccount: "9912345678",
		bankName: "Providus Bank",
		accountBalance: "₦200,000.00",
	},
};
