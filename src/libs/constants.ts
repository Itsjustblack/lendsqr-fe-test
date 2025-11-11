export const PAGE_SIZES = [10, 20, 50, 100];

export const MAX_VISIBLE_PAGES = 7;

export const PAGE_THRESHOLD = 3;

export const ELLIPSIS = "...";

export const PHONE_REGEX =
	/^(?:0|(\+234))(?:(701|708|802|808|812|901|902|703|706|803|806|810|813|814|816|905|805|807|811|817|818|809|903|906))\d{7}$/;

export const NAV_ITEMS = [
	{
		category: "Customers",
		items: [
			{ name: "Users", icon: "/assets/icons/people.svg" },
			{ name: "Guarantors", icon: "/assets/icons/guarantors.svg" },
			{ name: "Loans", icon: "/assets/icons/loans.svg" },
			{ name: "Decision Models", icon: "/assets/icons/decision-models.svg" },
			{ name: "Savings", icon: "/assets/icons/savings.svg" },
			{ name: "Loan Requests", icon: "/assets/icons/loan-products.svg" },
			{ name: "Whitelist", icon: "/assets/icons/whitelist.svg" },
			{ name: "Karma", icon: "/assets/icons/karma.svg" },
		],
	},
	{
		category: "Businesses",
		items: [
			{ name: "Organization", icon: "/assets/icons/organization.svg" },
			{ name: "Loan Products", icon: "/assets/icons/loan-products.svg" },
			{
				name: "Savings Products",
				icon: "/assets/icons/savings-products.svg",
			},
			{ name: "Fees and Charges", icon: "/assets/icons/fees-charges.svg" },
			{ name: "Transactions", icon: "/assets/icons/transactions.svg" },
			{ name: "Services", icon: "/assets/icons/services.svg" },
			{ name: "Service Account", icon: "/assets/icons/service-account.svg" },
			{ name: "Settlements", icon: "/assets/icons/settlements.svg" },
			{ name: "Reports", icon: "/assets/icons/reports.svg" },
		],
	},
	{
		category: "Settings",
		items: [
			{ name: "Preferences", icon: "/assets/icons/preferences.svg" },
			{ name: "Fees and Pricing", icon: "/assets/icons/fees-pricing.svg" },
			{ name: "Audit Logs", icon: "/assets/icons/audit-logs.svg" },
			{ name: "System Messages", icon: "/assets/icons/system-messages.svg" },
		],
	},
];
