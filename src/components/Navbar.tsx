import Link from 'next/link'
import { Home, Package, Settings, User } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">Inventarium</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem href="/" icon={<Home className="w-4 h-4 mr-2" />} text="Inicio" />
              <NavItem href="/products" icon={<Package className="w-4 h-4 mr-2" />} text="Productos" />
              <NavItem href="/settings" icon={<Settings className="w-4 h-4 mr-2" />} text="Ajustes" />
              <NavItem href="/profile" icon={<User className="w-4 h-4 mr-2" />} text="Perfil" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
  <Link
    href={href}
    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
  >
    {icon}
    {text}
  </Link>
)

export default Navbar
