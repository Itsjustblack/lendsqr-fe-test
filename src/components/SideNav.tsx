import { NAV_ITEMS } from "../libs/constants";
import "../styles/layout/SideNav.scss";

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
