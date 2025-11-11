import UsersTable from "../components/UsersTable";
import PageTransition from "../components/PageTransition";
import "../styles/pages/Dashboard.scss";

const Dashboard = () => {
	return (
		<PageTransition>
			<h1 className="title">Users</h1>
			<div className="user-stats">
				<div className="card">
					<img
						src="/assets/icons/users.svg"
						alt="users icon"
					/>
					<p>Users</p>
					<span>2,453</span>
				</div>
				<div className="card">
					<img
						src="/assets/icons/active-users.svg"
						alt="users icon"
					/>
					<p>Active Users</p>
					<span>2,453</span>
				</div>
				<div className="card">
					<img
						src="/assets/icons/loan-users.svg"
						alt="users icon"
					/>
					<p>Users with loans</p>
					<span>2,453</span>
				</div>
				<div className="card">
					<img
						src="/assets/icons/savings-users.svg"
						alt="users icon"
					/>
					<p>Users with Savings</p>
					<span>2,453</span>
				</div>
			</div>
			<UsersTable />
		</PageTransition>
	);
};

export default Dashboard;
