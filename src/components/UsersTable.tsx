import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type PaginationState,
	type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { mockUsers } from "../data/mockUsers";
import { formatDate } from "../libs/utils";
import "../styles/components/UsersTable.scss";
import type { User, UserStatus } from "../types/user";
import ActionsMenu from "./ActionsMenu";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";
import TableFilterButton from "./TableFilter";

const UsersTable = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
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
			cell: ({ row }) => formatDate(row.original.dateJoined as Date),
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

	const table = useReactTable({
		data: mockUsers,
		columns,
		state: {
			sorting,
			pagination,
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

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
											<div
												className="users-table__header-content"
												// onClick={header.column.getToggleSortingHandler()}
											>
												<span className="users-table__header-label">
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</span>
												{header.column.getCanSort() && (
													<button
														className="users-table__filter-button"
														// onClick={() => handleFilterClick(column.key)}
														aria-label={`Filter by ${header.column.columnDef.header}`}
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
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="users-table__row"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="users-table__cell"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination table={table} />
		</div>
	);
};

export default UsersTable;
