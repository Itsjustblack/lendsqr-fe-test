import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Dropdown, { type OptionType } from ".";

describe("Dropdown", () => {
	const mockOptions: OptionType[] = [
		{ label: "10", value: 10 },
		{ label: "20", value: 20 },
		{ label: "50", value: 50 },
	];

	it("should render with selected option", async () => {
		const onChangeMock = vi.fn();

		render(
			<Dropdown
				options={mockOptions}
				selectedOption={mockOptions[0]}
				onChange={onChangeMock}
			/>
		);

		// Component renders with selected option
		expect(screen.getByText("10")).toBeInTheDocument();

		// onChange should not be called on initial render
		expect(onChangeMock).not.toHaveBeenCalled();
	});

	it("should update displayed value when controlled value changes", () => {
		const onChangeMock = vi.fn();

		const { rerender } = render(
			<Dropdown
				options={mockOptions}
				selectedOption={mockOptions[0]}
				onChange={onChangeMock}
			/>
		);

		// Initially showing first option
		expect(screen.getByText("10")).toBeInTheDocument();

		// Simulate external change to controlled value
		rerender(
			<Dropdown
				options={mockOptions}
				selectedOption={mockOptions[1]}
				onChange={onChangeMock}
			/>
		);

		// Should now show second option
		expect(screen.getByText("20")).toBeInTheDocument();
	});

	it("should call onChange when user selects an option", async () => {
		const user = userEvent.setup();
		const onChangeMock = vi.fn();

		render(
			<Dropdown
				options={mockOptions}
				selectedOption={mockOptions[0]}
				onChange={onChangeMock}
			/>
		);

		// Find and click the dropdown control to open menu
		const dropdownControl = screen
			.getByText("10")
			.closest(".dropdown__control");
		expect(dropdownControl).toBeInTheDocument();

		await user.click(dropdownControl!);

		// Find and click a different option
		const option20 = await screen.findByText("20");
		await user.click(option20);

		// Verify onChange was called with the selected option
		expect(onChangeMock).toHaveBeenCalledTimes(1);
		expect(onChangeMock).toHaveBeenCalledWith(
			mockOptions[1],
			expect.objectContaining({ action: "select-option" })
		);
	});

	describe("Error Handling - Negative Scenarios", () => {
		it("should handle empty options array", () => {
			const onChangeMock = vi.fn();

			render(
				<Dropdown
					options={[]}
					selectedOption={null}
					onChange={onChangeMock}
				/>
			);

			// Should render without crashing
			// Component should handle empty options gracefully
			const dropdown = document.querySelector(".dropdown");
			expect(dropdown).toBeInTheDocument();
		});
	});
});
