import {
	type LoginFormValues,
	loginSchema,
} from "@/libs/validation/loginSchema";
import "@/styles/pages/LoginPage.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import PageTransition from "../components/PageTransition";

const LoginPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
		console.log("Login data:", data);
		navigate("/users");
	};

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
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="form-field">
									<input
										type="email"
										placeholder="Email"
										{...register("email")}
									/>
									{errors.email && (
										<span className="error-message">
											{errors.email.message}
										</span>
									)}
								</div>
								<div className="form-field">
									<input
										type="password"
										placeholder="Password"
										{...register("password")}
									/>
									{errors.password && (
										<span className="error-message">
											{errors.password.message}
										</span>
									)}
								</div>
								<p className="form-link">Forgot Password?</p>
								<button
									type="submit"
									disabled={!isValid}
								>
									LOG IN
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</PageTransition>
	);
};

export default LoginPage;
