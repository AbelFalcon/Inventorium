import { DataTableSearch } from "./columns"

function ProductTable({ table }) {
  return (
    <div className="overflow-x-auto">
      <DataTableSearch table={table} />
      <h1>prueba</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <th
                key={headerGroup.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {headerGroup.headers.map((header ) => (
                  <div key={header.id}>
                    {header.isPlaceholder ? null : header.render("Header")}
                  </div>
                ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
