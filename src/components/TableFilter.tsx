import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Popover } from "react-tiny-popover";
import {
	filterSchema,
	type FilterFormValues,
} from "../libs/validation/filterSchema";
import { useFilters } from "../store/filters";
import "../styles/components/TableFilter.scss";
import Dropdown, { type OptionType } from "./Dropdown";

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

const TableFilter = () => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isValid },
	} = useForm<FilterFormValues>({
		resolver: zodResolver(filterSchema),
		mode: "onChange",
	});

	const { setFilters, resetFilters } = useFilters();

	const onSubmit: SubmitHandler<FilterFormValues> = (data) => {
		setFilters(data);
	};

	const handleReset = () => {
		reset();
		resetFilters();
	};

	return (
		<form
			className="table-filter"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="table-filter__field">
				<label
					htmlFor="organization"
					className="table-filter__label"
				>
					Organization
				</label>
				<Controller
					name="organization"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Dropdown
							options={organizationOptions}
							menuPlacement="bottom"
							selectedOption={
								organizationOptions.find((opt) => opt.value === value) || null
							}
							onChange={(option) => onChange(option?.value || null)}
							placeholder="Select"
						/>
					)}
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
					{...register("username")}
				/>
				{errors.username && <span>This field is required</span>}
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
					{...register("email")}
				/>
				{errors.email && (
					<span className="error-message">{errors.email.message}</span>
				)}
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
						{...register("date")}
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
					{...register("phoneNumber")}
				/>
				{errors.phoneNumber && (
					<span className="error-message">{errors.phoneNumber.message}</span>
				)}
			</div>

			<div className="table-filter__field">
				<label
					htmlFor="status"
					className="table-filter__label"
				>
					Status
				</label>
				<Controller
					name="status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Dropdown
							options={statusOptions}
							menuPlacement="bottom"
							selectedOption={
								statusOptions.find((opt) => opt.value === value) || null
							}
							onChange={(option) => onChange(option?.value || null)}
							placeholder="Select"
						/>
					)}
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
					type="submit"
					disabled={!isValid}
					className="table-filter__button table-filter__button--filter"
				>
					Filter
				</button>
			</div>
		</form>
	);
};

const TableFilterButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);

	const filterContent = <TableFilter />;

	return (
		<Popover
			isOpen={isOpen}
			positions={["bottom", "left"]}
			align="end"
			padding={10}
			reposition={false}
			onClickOutside={closeMenu}
			content={() => filterContent} // use memoized instance
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
