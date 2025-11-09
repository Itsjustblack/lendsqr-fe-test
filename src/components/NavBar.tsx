import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const NavBar = () => {
	return (
		<nav className="nav-bar">
			<div className="logo">
				<img
					src="/assets/images/logo.svg"
					alt="Lendsqr logo"
				/>
			</div>
			<button
				className="menu-button"
				type="button"
			>
				<img
					src="/assets/icons/menu.svg"
					alt="Menu icon"
				/>
			</button>

			<SearchBar />

			<div className="nav-group">
				<a
					href="#"
					className="nav-link"
				>
					Docs
				</a>
				<button
					className="notification-button"
					type="button"
				>
					<img
						src="/assets/icons/bell.svg"
						alt="Notifications icon"
					/>
				</button>
				<UserProfile />
			</div>
		</nav>
	);
};

export default NavBar;
