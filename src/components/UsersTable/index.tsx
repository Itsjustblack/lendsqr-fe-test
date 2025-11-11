import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type SortingState,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getAllUsers } from "../../libs/api/user/queries";
import { formatDate } from "../../libs/utils";
import { useFilters, usePagination } from "../../store/filters";
import "@/styles/components/UsersTable.scss";
import type { User, UserStatus } from "../../types/user";
import ActionsMenu from "../ActionsMenu";
import Pagination from "../Pagination";
import StatusBadge from "../StatusBadge";
import TableFilterButton from "../TableFilter";

const UsersTable = () => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const { filters } = useFilters();
	const { pagination, setPagination } = usePagination();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["users", pagination, filters],
		queryFn: () =>
			getAllUsers({
				filters,
				pagination: {
					page: pagination.pageIndex + 1,
					pageSize: pagination.pageSize,
				},
			}),
		placeholderData: keepPreviousData,
	});

	// Column definitions
	const columns: ColumnDef<User>[] = [
		{
			accessorKey: "organization",
			header: "Organization",
			cell: ({ row }) => row.original.organization,
		},
		{
			accessorKey: "username",
			header: "Username",
			cell: ({ row }) => row.original.username,
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => row.original.email,
		},
		{
			accessorKey: "phoneNumber",
			header: "Phone Number",
			cell: ({ row }) => row.original.phoneNumber,
		},
		{
			accessorKey: "dateJoined",
			header: "Date Joined",
			cell: ({ row }) => formatDate(new Date(row.original.dateJoined)),
			sortingFn: "datetime",
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<StatusBadge status={row.original.status as UserStatus} />
			),
		},
		{
			id: "actions",
			header: () => <TableFilterButton />,
			cell: ({ row }) => <ActionsMenu userId={row.original.id} />,
		},
	];

	const allUsers = data?.data || [];
	const pageCount = data?.pageCount ?? 0;

	const table = useReactTable({
		data: allUsers,
		columns,
		state: {
			sorting,
			pagination,
		},
		pageCount,
		onSortingChange: setSorting,
		onPaginationChange: (updater) => {
			if (typeof updater === "function") {
				setPagination(updater(pagination));
			} else {
				setPagination(updater);
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualFiltering: true,
		manualPagination: true,
	});

	if (isError)
		return (
			<AnimatePresence>
				<motion.div
					className="error-section"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<img
						src="/assets/images/no-users.svg"
						alt="Error illustration"
						className="error-section__illustration"
					/>
					<span className="error-section__title">Unable to load users</span>
					<p className="error-section__subtitle">Please try again later.</p>
				</motion.div>
			</AnimatePresence>
		);

	return (
		<div className="users-table">
			<div className="users-table__container">
				<table
					className="users-table__table"
					key={`${pagination.pageIndex}-${pagination.pageSize}`}
				>
					<thead className="users-table__header">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="users-table__header-cell"
									>
										{header.isPlaceholder ? null : (
											<div className="users-table__header-content">
												<span className="users-table__header-label">
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</span>
												{header.column.getCanSort() && (
													<button
														className="users-table__filter-button"
														onClick={header.column.getToggleSortingHandler()}
														aria-label={`Sort by ${header.column.columnDef.header}`}
													>
														<img
															src="/assets/icons/filter.svg"
															alt=""
															className="users-table__filter-icon"
														/>
													</button>
												)}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan={columns.length}>
									<AnimatePresence>
										<motion.div
											className="loader-container"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<div
												data-testid="loader"
												className="loader"
											></div>
										</motion.div>
									</AnimatePresence>
								</td>
							</tr>
						) : allUsers.length <= 0 ? (
							<tr>
								<td colSpan={columns.length}>
									<AnimatePresence>
										<motion.div
											className="no-users"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<img
												src="/assets/images/no-users-2.svg"
												alt="No Users"
												className="no-users__illustration"
											/>
											<span className="no-users__title">No Users Found</span>
											<p className="no-users__subtitle">
												Customers will show up here once they start creating an
												account
											</p>
										</motion.div>
									</AnimatePresence>
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className="users-table__row"
								>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className="users-table__cell"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{!isLoading && allUsers.length > 0 && <Pagination table={table} />}
		</div>
	);
};

export default UsersTable;
