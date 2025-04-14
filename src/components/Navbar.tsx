
import { Link } from "react-router-dom";
import { Gauge, Info, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: <Gauge className="w-5 h-5" /> },
    { name: "About Us", path: "/about", icon: <Info className="w-5 h-5" /> },
    { name: "Editor", path: "/editor", icon: <Code className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-air-blue to-air-teal rounded-md"></div>
            <span className="text-lg font-bold text-gray-800">AirMonitor</span>
          </div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
          <div className="md:hidden flex space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-air-blue transition-colors"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ item }: { item: { name: string; path: string; icon: React.ReactNode } }) => {
  const isActive = window.location.pathname === item.path;
  
  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "text-air-blue bg-air-lightBlue font-medium"
          : "text-gray-600 hover:text-air-blue hover:bg-gray-50"
      )}
    >
      {item.icon}
      <span>{item.name}</span>
    </Link>
  );
};

export default Navbar;
