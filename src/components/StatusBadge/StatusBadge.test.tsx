import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from ".";

describe("StatusBadge", () => {
	describe("Rendering", () => {
		it("should render active status correctly", () => {
			render(<StatusBadge status="active" />);

			const badge = screen.getByText("Active");
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass("status-badge");
			expect(badge).toHaveClass("status-badge__active");
		});

		it("should render inactive status correctly", () => {
			render(<StatusBadge status="inactive" />);

			const badge = screen.getByText("Inactive");
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass("status-badge");
			expect(badge).toHaveClass("status-badge__inactive");
		});

		it("should render pending status correctly", () => {
			render(<StatusBadge status="pending" />);

			const badge = screen.getByText("Pending");
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass("status-badge");
			expect(badge).toHaveClass("status-badge__pending");
		});

		it("should render blacklisted status correctly", () => {
			render(<StatusBadge status="blacklisted" />);

			const badge = screen.getByText("Blacklisted");
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass("status-badge");
			expect(badge).toHaveClass("status-badge__blacklisted");
		});
	});
});
