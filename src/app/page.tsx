import Chart from "@/components/Chart"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main>
      <header className="p-3">
        <Navbar />
      </header>
      <Chart />
    </main>
  )
}
