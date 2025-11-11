import Select, {
	type DropdownIndicatorProps,
	type MenuPlacement,
	components,
} from "react-select";
import "../styles/components/Dropdown.scss";

export type OptionType<T = number> = {
	label: string;
	value: T;
};

const DropdownIndicator = <T,>(
	props: DropdownIndicatorProps<OptionType<T>>
) => {
	return (
		<components.DropdownIndicator {...props}>
			<img
				src="/assets/icons/chevron-down.svg"
				alt=""
				style={{ width: "14px", height: "14px" }}
			/>
		</components.DropdownIndicator>
	);
};

interface Props<T = number> {
	options: OptionType<T>[];
	selectedOption: OptionType<T> | null;
	onChange: (option: OptionType<T> | null) => void;
	placeholder?: string;
	menuPlacement?: MenuPlacement;
	variant?: "default" | "pagination";
}

const Dropdown = <T = number,>({
	options,
	selectedOption,
	menuPlacement = "top",
	onChange,
	placeholder = "Select",
	variant = "default",
}: Props<T>) => {
	const wrapperClass =
		variant === "pagination" ? "dropdown dropdown--pagination" : "dropdown";

	return (
		<div
			className={wrapperClass}
			onClick={(e) => e.stopPropagation()}
		>
			<Select<OptionType<T>>
				value={selectedOption}
				options={options}
				onChange={onChange}
				classNamePrefix="dropdown"
				isSearchable={false}
				menuPlacement={menuPlacement}
				placeholder={placeholder}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: DropdownIndicator<T>,
				}}
			/>
		</div>
	);
};

export default Dropdown;
