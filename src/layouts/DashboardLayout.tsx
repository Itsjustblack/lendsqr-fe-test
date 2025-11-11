import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";

const DashboardLayout = () => {
	return (
		<main className="layout">
			<NavBar />
			<SideNav />
			<div className="layout__content">
				<div className="layout__container">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
