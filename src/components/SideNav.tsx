const NAV_ITEMS = [
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
			{ name: "Savings Products", icon: "/assets/icons/savings-products.svg" },
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

const SideNav = () => {
	return (
		<div className="side-nav">
			<div className="side-nav__container">
				<div className="switch-organization">
					<img
						className="icon-business"
						src="/assets/icons/business.svg"
						alt="Business Icon"
					/>
					<span>Switch Organization</span>
					<img
						className="icon-dropdown"
						src="/assets/icons/chevron-down.svg"
						alt="Dropdown Icon"
					/>
				</div>
				<a className="nav-link active">
					<img
						className="icon"
						src="/assets/icons/home.svg"
						alt="Dashboard Icon"
					/>
					<span>Dashboard</span>
				</a>
				{NAV_ITEMS.map((group) => (
					<ul
						key={group.category}
						className="nav-group"
					>
						<p className="title">{group.category}</p>
						{group.items.map((item) => (
							<li key={item.name}>
								<a className="nav-link">
									<img
										className="icon"
										src={item.icon}
										alt={`${item.name} Icon`}
									/>
									<span>{item.name}</span>
								</a>
							</li>
						))}
					</ul>
				))}
				<a className="nav-link nav-link__footer">
					<img
						className="icon"
						src="/assets/icons/logout.svg"
						alt="Logout Icon"
					/>
					<span>Logout</span>
				</a>
				<span className="side-nav__footer-text">v1.2.0</span>
			</div>
		</div>
	);
};

export default SideNav;
