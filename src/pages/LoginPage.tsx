import { useNavigate } from "react-router";
import PageTransition from "../components/PageTransition";
import "../styles/pages/LoginPage.scss";

const LoginPage = () => {
	const navigate = useNavigate();

	function goToDashboard() {
		navigate("/users");
	}
	return (
		<PageTransition>
			<main className="login-page">
			<div className="container">
				<div className="logo">
					<img
						src="/assets/images/logo.svg"
						alt="Lendsqr logo"
					/>
				</div>

				<div className="hero-content">
					<img
						src="/assets/images/login-hero.png"
						alt="Login hero image"
					/>
				</div>

				<div className="right-content">
					<div className="login-form">
						<div className="form-header">
							<h1>Welcome!</h1>
							<p>Enter details to login.</p>
						</div>
						<form>
							<input
								name="email"
								type="email"
								placeholder="Email"
							/>
							<input
								name="password"
								type="password"
								placeholder="Password"
							/>
							<p className="form-link">Forgot Password?</p>
							<button onClick={goToDashboard}>LOG IN</button>
						</form>
					</div>
				</div>
			</div>
		</main>
		</PageTransition>
	);
};

export default LoginPage;
