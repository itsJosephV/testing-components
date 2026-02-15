import React from "react";
import { viviendas } from "../../data/viviendas";
import { type Vivienda } from "../../data/viviendas";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Vivienda>();

const columns: ColumnDef<Vivienda, any>[] = [
  columnHelper.accessor("tipo", {
    header: "Tipo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("planta", {
    header: "Planta",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dormitorios", {
    header: "Dorm.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("baños", {
    header: "Baños",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("superficie", {
    header: "Superficie",
    cell: (info) => `${info.getValue()} m²`,
  }),
  columnHelper.accessor("precio", {
    header: "Precio",
    cell: (info) => {
      const precio = info.getValue();
      return precio ? `${precio.toLocaleString("es-ES")} €` : "-";
    },
  }),
  columnHelper.accessor("estado", {
    header: "Estado",
    cell: (info) => {
      const estado = info.getValue();
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            estado === "disponible"
              ? "bg-green-100 text-green-800"
              : estado === "reservado"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {estado.charAt(0).toUpperCase() + estado.slice(1)}
        </span>
      );
    },
  }),
  // columnHelper.display({
  //   id: "plano",
  //   header: "PLANO",
  //   cell: () => (
  //     <button
  //       onClick={() => alert("Ver plano")}
  //       className="text-blue-600 hover:text-blue-800"
  //     >
  //       🗺️
  //     </button>
  //   ),
  // }),
  // columnHelper.display({
  //   id: "contacto",
  //   header: "CONTACTO",
  //   cell: () => (
  //     <button
  //       onClick={() => alert("Contactar")}
  //       className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
  //     >
  //       Contacto
  //     </button>
  //   ),
  // }),
];

const Table = () => {
  const table = useReactTable({
    data: viviendas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider border-b"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              role="button"
              onClick={() => {
                alert("clicked");
              }}
              key={row.id}
              className="hover:bg-gray-50"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-4 whitespace-nowrap text-xs text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
