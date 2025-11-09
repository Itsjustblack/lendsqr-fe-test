import React, { useState } from "react";
import Dropdown, { type OptionType } from "./Dropdown";
import "../styles/components/TableFilter.scss";
import { Popover } from "react-tiny-popover";

export interface TableFilterProps {
	// onFilter: (filters: FilterValues) => void;
	onReset: () => void;
	onClose?: () => void;
}

export interface UserFilters {
	organization?: string;
	username?: string;
	email?: string;
	date?: string;
	phoneNumber?: string;
	status?: string;
}

const organizationOptions: OptionType<string>[] = [
	{ label: "Lendsqr", value: "lendsqr" },
	{ label: "Lendstar", value: "lendstar" },
	{ label: "Irorun", value: "irorun" },
];

const statusOptions: OptionType<string>[] = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" },
	{ label: "Pending", value: "pending" },
	{ label: "Blacklisted", value: "blacklisted" },
];

const TableFilter: React.FC<TableFilterProps> = ({
	// onFilter,
	onReset,
	onClose,
}) => {
	const [filters, setFilters] = useState<UserFilters>({});

	const handleInputChange = (field: keyof UserFilters, value: string) => {
		setFilters((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleFilter = () => {
		// onFilter(filters);
		console.log(filters);
	};

	const handleReset = () => {
		setFilters({});
		onReset();
	};

	return (
		<div className="table-filter">
			<div className="table-filter__field">
				<label
					htmlFor="organization"
					className="table-filter__label"
				>
					Organization
				</label>
				<Dropdown
					options={organizationOptions}
					menuPlacement="bottom"
					selectedOption={
						filters.organization
							? organizationOptions.find(
									(opt) => opt.value === filters.organization
							  ) || null
							: null
					}
					onChange={(option) =>
						handleInputChange("organization", option?.value || "")
					}
					placeholder="Select"
				/>
			</div>

			<div className="table-filter__field">
				<label
					htmlFor="username"
					className="table-filter__label"
				>
					Username
				</label>
				<input
					id="username"
					type="text"
					className="table-filter__input"
					placeholder="User"
					value={filters.username}
					onChange={(e) => handleInputChange("username", e.target.value)}
				/>
			</div>

			<div className="table-filter__field">
				<label
					htmlFor="email"
					className="table-filter__label"
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					className="table-filter__input"
					placeholder="Email"
					value={filters.email}
					onChange={(e) => handleInputChange("email", e.target.value)}
				/>
			</div>

			<div className="table-filter__field">
				<label
					htmlFor="date"
					className="table-filter__label"
				>
					Date
				</label>
				<div className="table-filter__date-wrapper">
					<input
						id="date"
						type="date"
						className="table-filter__input table-filter__input--date"
						placeholder="Date"
						value={filters.date}
						onChange={(e) => handleInputChange("date", e.target.value)}
					/>
					<img
						src="/assets/icons/calendar.svg"
						alt=""
						className="table-filter__date-icon"
					/>
				</div>
			</div>

			<div className="table-filter__field">
				<label
					htmlFor="phoneNumber"
					className="table-filter__label"
				>
					Phone Number
				</label>
				<input
					id="phoneNumber"
					type="tel"
					className="table-filter__input"
					placeholder="Phone Number"
					value={filters.phoneNumber}
					onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
				/>
			</div>

			<div className="table-filter__field">
				<label
					htmlFor="status"
					className="table-filter__label"
				>
					Status
				</label>
				<Dropdown
					options={statusOptions}
					menuPlacement="bottom"
					selectedOption={
						filters.status
							? statusOptions.find((opt) => opt.value === filters.status) ||
							  null
							: null
					}
					onChange={(option) =>
						handleInputChange("status", option?.value || "")
					}
					placeholder="Select"
				/>
			</div>

			<div className="table-filter__actions">
				<button
					type="button"
					className="table-filter__button table-filter__button--reset"
					onClick={handleReset}
				>
					Reset
				</button>
				<button
					type="button"
					className="table-filter__button table-filter__button--filter"
					onClick={handleFilter}
				>
					Filter
				</button>
			</div>
		</div>
	);
};

const TableFilterButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);

	return (
		<Popover
			isOpen={isOpen}
			positions={["bottom", "left"]}
			align="end"
			padding={10}
			reposition={false}
			// onClickOutside={closeMenu}
			content={() => (
				<TableFilter
					onReset={() => "ksks"}
					onClose={closeMenu}
				/>
			)}
		>
			<button
				onClick={openMenu}
				className="actions-menu__button"
			>
				<img
					src="/assets/icons/custom-filter
					.svg"
					alt="Actions Icon"
					className="actions-menu__icon"
				/>
			</button>
		</Popover>
	);
};

export default TableFilterButton;
