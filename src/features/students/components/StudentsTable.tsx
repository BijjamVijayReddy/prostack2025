"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Student } from "../students.types";

interface StudentsTableProps {
  data: Student[];
}

export function StudentsTable({ data }: StudentsTableProps) {
  const columns: ColumnDef<Student>[] = [
    {
      id: "serial",
      header: "S.No",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return pageIndex * pageSize + row.index + 1;
      },
    },
    { accessorKey: "admissionNo", header: "Admission No" },
    { accessorKey: "name", header: "Student Name" },
    { accessorKey: "courseTakenDate", header: "Admission Date" },
    { accessorKey: "mobile", header: "Mobile" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "course", header: "Course" },
    { accessorKey: "dueDate", header: "Due Date" },
    {
      accessorKey: "totalPaid",
      header: "Paid",
      cell: (info) => `₹${info.getValue<number>().toLocaleString("en-IN")}`,
    },
    {
      accessorKey: "pendingAmount",
      header: "Pending",
      cell: (info) => `₹${info.getValue<number>().toLocaleString("en-IN")}`,
    },
    {
      id: "edit",
      header: "Edit",
      cell: () => (
        <button
          className="rounded-md p-1 text-indigo-600 hover:bg-indigo-50"
          title="Edit Student"
        >
          <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">
        No students found for selected filters.
      </p>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className=" border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-indigo-50 to-purple-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-indigo-200">
                {headerGroup.headers.map((header) => {
                  const isImportant =
                    header.column.id === "serial" ||
                    header.column.id === "admissionNo" ||
                    header.column.id === "name" ||
                    header.column.id === "pendingAmount";

                  return (
                    <th
                      key={header.id}
                      className={`
                        px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide
                        ${isImportant ? "text-indigo-700" : "text-gray-700"}
                        border-r last:border-r-0 border-indigo-100
                      `}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isFullyPaid = row.original.pendingAmount === 0;

              return (
                <tr
                  key={row.id}
                  className={`
                    border-t
                    hover:bg-gray-50
                    cursor-pointer
                    ${isFullyPaid ? "bg-orange-300 hover:bg-orange-200" : ""}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
