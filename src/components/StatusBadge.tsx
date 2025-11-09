import "../styles/components/StatusBadge.scss";
import type { UserStatus } from "../types/user";

const StatusBadge: React.FC<{ status: UserStatus }> = ({ status }) => {
	return (
		<div className={`status-badge status-badge__${status.toLowerCase()}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</div>
	);
};

export default StatusBadge;
