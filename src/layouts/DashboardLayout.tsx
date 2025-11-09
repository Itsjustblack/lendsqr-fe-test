// import NavBar from "../components/NavBar";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";

interface Props {
	children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<main className="layout">
			<NavBar />
			<div className="main-content">
				<SideNav />
				<div className="content">{children}</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
