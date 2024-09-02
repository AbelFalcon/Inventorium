"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export type Product = {
  id: number
  title: string
  price: number
  description: string
  images: string
  creationAt: string
  updatedAt: string
  categoryID: string
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
    size: 200,
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(price)
      return <div className="text-right font-medium">{formatted}</div>
    },
    size: 100,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate"
        title={row.getValue("description")}
      >
        {row.getValue("description")}
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: "images",
    header: "Imagen",
    cell: ({ row }) => (
      <img
        src={row.getValue("images")}
        alt={row.getValue("title")}
        className="w-10 h-10 object-cover rounded"
      />
    ),
    size: 100,
  },
  {
    accessorKey: "creationAt",
    header: "Fecha de creación",
    cell: ({ row }) =>
      format(new Date(row.getValue("creationAt")), "dd/MM/yyyy", {
        locale: es,
      }),
    size: 150,
  },
  {
    accessorKey: "updatedAt",
    header: "Última actualización",
    cell: ({ row }) =>
      format(new Date(row.getValue("updatedAt")), "dd/MM/yyyy", { locale: es }),
    size: 150,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Ver", product.id)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Editar", product.id)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Eliminar", product.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 100,
  },
]

export function PaginationControls({ table }: { table: any }) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="h-8 w-[70px] rounded-md border border-input bg-transparent text-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function DataTableSearch({ table }: { table: any }) {
  return (
    <div className="flex items-center py-4 ml-4">
      <Input
        placeholder="Buscar productos..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  )
}
