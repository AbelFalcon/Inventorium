import Navbar from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Package, DollarSign, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Panel de Control
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Productos" value="1,234" icon={<Package />} />
          <StatCard
            title="Ventas Totales"
            value="$45,678"
            icon={<DollarSign />}
          />
          <StatCard title="Crecimiento" value="+12.3%" icon={<TrendingUp />} />
          <StatCard title="Clientes Activos" value="567" icon={<Users />} />
        </div>
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="bg-primary/10 p-3 rounded-full mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
