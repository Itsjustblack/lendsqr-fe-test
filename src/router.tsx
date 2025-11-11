import { createBrowserRouter, Navigate } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import UserDetails from "./pages/UserDetails";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		element: <DashboardLayout />,
		children: [
			{
				path: "/users",
				element: <Dashboard />,
			},
			{
				path: "/users/:id",
				element: <UserDetails />,
			},
		],
	},
	{
		path: "/",
		element: (
			<Navigate
				to="/login"
				replace
			/>
		),
	},

	{
		path: "*",
		element: (
			<Navigate
				to="/"
				replace
			/>
		),
	},
]);
