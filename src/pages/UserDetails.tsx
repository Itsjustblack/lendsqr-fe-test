import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { IUserDetails } from "../types/user";
import { mockUserData } from "../libs/userDetails";

import "../styles/pages/UserDetails.scss";

const UserDetails = () => {
	const [userData, setUserData] = useLocalStorage<IUserDetails>(
		"user-details",
		mockUserData
	);

	useEffect(() => {
		if (!userData) setUserData(mockUserData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	const handleBlacklist = () => {
		console.log("Blacklist user");
	};

	const handleActivate = () => {
		console.log("Activate user");
	};

	return (
		<div className="user-details">
			<div className="user-details__header">
				<button
					className="user-details__back-btn"
					onClick={handleBack}
				>
					<img
						src="/assets/icons/back-arrow.svg"
						alt=""
					/>
					<span>Back to Users</span>
				</button>

				<div className="user-details__title-row">
					<h1 className="user-details__title">User Details</h1>

					<div className="user-details__actions">
						<button
							className="user-details__action-btn user-details__action-btn--blacklist"
							onClick={handleBlacklist}
						>
							<span className="user-details__action-text">Blacklist User</span>
							<img
								className="user-details__action-icon"
								src="/assets/icons/check-badge.svg"
								alt="Blacklist Icon"
							/>
						</button>
						<button
							className="user-details__action-btn user-details__action-btn--activate"
							onClick={handleActivate}
						>
							<span className="user-details__action-text">Activate User</span>
							<img
								className="user-details__action-icon"
								src="/assets/icons/blacklist.svg"
								alt="Blacklist Icon"
							/>
						</button>
					</div>
				</div>
			</div>

			<div className="user-details__summary-card">
				<div className="user-details__basic-info">
					<div className="user-details__avatar-container">
						<div className="user-details__avatar-section">
							<div className="user-details__avatar">
								<img
									src="/assets/icons/user-avatar.svg"
									alt=""
								/>
							</div>
						</div>
						<div className="user-details__name-section">
							<h2 className="user-details__name">{userData.basicInfo.name}</h2>
							<p className="user-details__user-id">
								{userData.basicInfo.userId}
							</p>
						</div>
					</div>

					<div className="user-details__divider"></div>

					<div className="user-details__info-container">
						<div className="user-details__tier-section">
							<p className="user-details__tier-label">User's Tier</p>
							<div className="user-details__stars">
								{[1, 2, 3].map((star) => (
									<img
										key={star}
										src={
											star <= userData.basicInfo.tier
												? "/assets/icons/star-filled.svg"
												: "/assets/icons/star-outline.svg"
										}
										alt=""
									/>
								))}
							</div>
						</div>
						<div className="user-details__divider"></div>
						<div className="user-details__bank-section">
							<p className="user-details__balance">
								{userData.basicInfo.accountBalance}
							</p>
							<p className="user-details__bank-info">
								{userData.basicInfo.bankAccount}/{userData.basicInfo.bankName}
							</p>
						</div>
					</div>
				</div>
				{/* TODO: Unresponsive on smaller screens */}
				<div className="user-details__tabs">
					<button className="user-details__tab user-details__tab--active">
						General Details
					</button>
					<button className="user-details__tab">Documents</button>
					<button className="user-details__tab">Bank Details</button>
					<button className="user-details__tab">Loans</button>
					<button className="user-details__tab">Savings</button>
					<button className="user-details__tab">App and System</button>
				</div>
			</div>

			<div className="user-details__info-card">
				<section className="user-details__section">
					<h3 className="user-details__section-title">Personal Information</h3>
					<div className="user-details__info-grid">
						<div className="user-details__info-item">
							<p className="user-details__info-label">Full Name</p>
							<p className="user-details__info-value">
								{userData.personalInfo.fullName}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Phone Number</p>
							<p className="user-details__info-value">
								{userData.personalInfo.phoneNumber}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Email Address</p>
							<p className="user-details__info-value">
								{userData.personalInfo.emailAddress}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">BVN</p>
							<p className="user-details__info-value">
								{userData.personalInfo.bvn}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Gender</p>
							<p className="user-details__info-value">
								{userData.personalInfo.gender}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Marital Status</p>
							<p className="user-details__info-value">
								{userData.personalInfo.maritalStatus}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Children</p>
							<p className="user-details__info-value">
								{userData.personalInfo.children}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Type of Residence</p>
							<p className="user-details__info-value">
								{userData.personalInfo.typeOfResidence}
							</p>
						</div>
					</div>
				</section>

				<section className="user-details__section">
					<h3 className="user-details__section-title">
						Education and Employment
					</h3>
					<div className="user-details__info-grid">
						<div className="user-details__info-item">
							<p className="user-details__info-label">Level of Education</p>
							<p className="user-details__info-value">
								{userData.education.levelOfEducation}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Employment Status</p>
							<p className="user-details__info-value">
								{userData.education.employmentStatus}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Sector of Employment</p>
							<p className="user-details__info-value">
								{userData.education.sectorOfEmployment}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Duration of Employment</p>
							<p className="user-details__info-value">
								{userData.education.durationOfEmployment}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Office Email</p>
							<p className="user-details__info-value">
								{userData.education.officeEmail}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Monthly Income</p>
							<p className="user-details__info-value">
								{userData.education.monthlyIncome}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Loan Repayment</p>
							<p className="user-details__info-value">
								{userData.education.loanRepayment}
							</p>
						</div>
					</div>
				</section>

				<section className="user-details__section">
					<h3 className="user-details__section-title">Socials</h3>
					<div className="user-details__info-grid">
						<div className="user-details__info-item">
							<p className="user-details__info-label">Twitter</p>
							<p className="user-details__info-value">
								{userData.socials.twitter}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Facebook</p>
							<p className="user-details__info-value">
								{userData.socials.facebook}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Instagram</p>
							<p className="user-details__info-value">
								{userData.socials.instagram}
							</p>
						</div>
					</div>
				</section>

				<section className="user-details__section">
					<h3 className="user-details__section-title">Guarantor</h3>
					<div className="user-details__info-grid">
						<div className="user-details__info-item">
							<p className="user-details__info-label">Full Name</p>
							<p className="user-details__info-value">
								{userData.guarantor.fullName}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Phone Number</p>
							<p className="user-details__info-value">
								{userData.guarantor.phoneNumber}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Email Address</p>
							<p className="user-details__info-value">
								{userData.guarantor.emailAddress}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Relationship</p>
							<p className="user-details__info-value">
								{userData.guarantor.relationship}
							</p>
						</div>
					</div>
				</section>

				<section className="user-details__section user-details__section--last">
					<h3 className="user-details__section-title"></h3>
					<div className="user-details__info-grid">
						<div className="user-details__info-item">
							<p className="user-details__info-label">Full Name</p>
							<p className="user-details__info-value">
								{userData.secondGuarantor.fullName}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Phone Number</p>
							<p className="user-details__info-value">
								{userData.secondGuarantor.phoneNumber}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Email Address</p>
							<p className="user-details__info-value">
								{userData.secondGuarantor.emailAddress}
							</p>
						</div>
						<div className="user-details__info-item">
							<p className="user-details__info-label">Relationship</p>
							<p className="user-details__info-value">
								{userData.secondGuarantor.relationship}
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default UserDetails;
