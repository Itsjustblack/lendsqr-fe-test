import "../styles/components/UserProfile.scss";

const UserProfile = () => {
	return (
		<div className="user-profile">
			<div className="avatar">
				<img
					src="/assets/images/profile.png"
					alt="User Avatar"
				/>
			</div>

			<div className="user-info">
				<span>Adedeji</span>
				<img
					src="/assets/icons/dropdown.svg"
					alt="Dropdown icon"
				/>
			</div>
		</div>
	);
};

export default UserProfile;
