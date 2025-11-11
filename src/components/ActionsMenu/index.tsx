import { useState } from "react";
import { useNavigate } from "react-router";
import { Popover } from "react-tiny-popover";

import "@/styles/components/ActionsMenu.scss";

const ActionsMenu: React.FC<{ userId: string }> = ({ userId }) => {
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);

	const handleViewDetails = () => {
		navigate(`/users/${userId}`);
		closeMenu();
	};

	return (
		<Popover
			isOpen={isOpen}
			positions={["bottom", "left"]}
			align="end"
			padding={10}
			onClickOutside={closeMenu}
			content={() => (
				<div className="actions-menu__dropdown">
					<div
						className="actions-menu__item"
						onClick={handleViewDetails}
					>
						<div className="actions-menu__icon">
							<img
								src="/assets/icons/eye.svg"
								alt=""
							/>
						</div>
						<span className="actions-menu__text">View Details</span>
					</div>
					<div
						className="actions-menu__item"
						onClick={closeMenu}
					>
						<img
							src="/assets/icons/blacklist-user.svg"
							alt=""
							className="actions-menu__icon"
						/>
						<span className="actions-menu__text">Blacklist User</span>
					</div>
					<div
						className="actions-menu__item"
						onClick={closeMenu}
					>
						<img
							src="/assets/icons/activate-user.svg"
							alt=""
							className="actions-menu__icon"
						/>
						<span className="actions-menu__text">Activate User</span>
					</div>
				</div>
			)}
		>
			<button
				onClick={openMenu}
				className="actions-menu__button"
			>
				<img
					src="/assets/icons/ellipsis.svg"
					alt="Actions Icon"
					className="actions-menu__icon"
				/>
			</button>
		</Popover>
	);
};

export default ActionsMenu;
