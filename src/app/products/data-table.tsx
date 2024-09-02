"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PaginationControls, DataTableSearch } from "./columns"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productImages, setProductImages] = useState("")
  const [productCategoryId, setProductCategoryId] = useState("")
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productName || !productPrice || !productDescription || !productImages || !productCategoryId) {
      console.error("Faltan datos del producto");
      // Muestra un mensaje de error al usuario
      return;
    }
    const newProduct = {
      title: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      images: productImages,
      categoryId: parseInt(productCategoryId)
    }
    console.log("Enviando producto:", newProduct);

    try {
      console.log("Iniciando solicitud fetch");
      const response = await fetch("http://localhost:4000/v1/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      console.log("Respuesta recibida:", response.status);

      if (response.ok) {
        console.log("Producto agregado exitosamente");
        setProductName("")
        setProductPrice("")
        setProductDescription("")
        setProductImages("")
        setProductCategoryId("")
        setIsDialogOpen(false)
        // Implementar la actualización de la tabla aquí
      } else {
        console.error("Error al agregar el producto. Estado:", response.status);
        const errorText = await response.text();
        console.error("Detalles del error:", errorText);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <DataTableSearch table={table} />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center space-x-2 mr-5"
        >
          <Plus />
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <Label htmlFor="productPrice">Price</Label>
              <Input
                id="productPrice"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                required
              />
            </div>
            <div>
              <Label htmlFor="productDescription">Description</Label>
              <Input
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter product description"
                required
              />
            </div>
            <div>
              <Label htmlFor="productCategoryId">Category</Label>
              <Input
                id="productCategoryId"
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
                placeholder="Enter product category ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="productImages">Images</Label>
              <Input
                id="productImages"
                value={productImages}
                onChange={(e) => setProductImages(e.target.value)}
                placeholder="Enter product images URL"
                required
              />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls table={table} />
    </div>
  )
}
