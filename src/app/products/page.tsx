import Navbar from "@/components/Navbar"
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns"
import { SwordsIcon } from "lucide-react"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Products() {
  const data = await getData()
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto p-4 mt-20">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
