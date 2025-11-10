// import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";

const DashboardLayout = () => {
	return (
		<main className="layout">
			<NavBar />
			<div className="main-content">
				<SideNav />
				<div className="content">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
