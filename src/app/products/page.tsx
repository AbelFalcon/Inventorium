import Navbar from "@/components/Navbar"
import { DataTable } from "./data-table"
import { columns, Product } from "./columns"

async function getData(): Promise<Product[]> {
  const res = await fetch("http://localhost:4000/v1/products")
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data
}

export default async function Products() {
  const data = await getData()
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <div className="bg-white rounded-lg shadow">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </main>
    </div>
  )
}
