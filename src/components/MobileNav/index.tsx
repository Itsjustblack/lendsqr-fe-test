import { createPortal } from "react-dom";
import { NAV_ITEMS } from "../../libs/constants";
import { useIsMenuOpen, useMobileMenuActions } from "../../store/mobileMenu";
import "@/styles/components/MobileNav.scss";

const MobileNav = () => {
	const isOpen = useIsMenuOpen();
	const { closeMenu } = useMobileMenuActions();

	const mobileNavContent = (
		<div className={`mobile-nav mobile-nav__${isOpen ? "open" : "closed"}`}>
			<div className="mobile-nav__overlay" />
			<div className="mobile-nav__logo-container">
				<img
					className="mobile-nav__logo"
					src="/assets/images/logo.svg"
					alt="Lendsqr logo"
				/>
				<img
					className="mobile-nav__close-btn"
					onClick={closeMenu}
					src="/assets/icons/close.svg"
					alt="Close menu icon"
				/>
			</div>
			<div className="mobile-nav__container">
				<div className="mobile-nav__sub-container">
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
					<span className="mobile-nav__footer-text">v1.2.0</span>
				</div>
			</div>
		</div>
	);

	return createPortal(mobileNavContent, document.body);
};

export default MobileNav;
