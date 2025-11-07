const LoginPage = () => {
	return (
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
							<button>LOG IN</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
