import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary">
          Index Money
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/performance">Past Performance</Link>
          <Link to="/pay-now">Pay Now</Link>
          <Link to="/unlisted-shares">Unlisted Shares</Link>
          <Link to="/contact">Contact Us</Link>

          <DropdownMenu>
            <DropdownMenuTrigger>More</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Blogs</DropdownMenuItem>
              <DropdownMenuItem>Gallery</DropdownMenuItem>
              <DropdownMenuItem>Career</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Buttons Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline">Open Free Demat</Button>
          <Button>Start Free Trial</Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-6 text-sm">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/services">Services</Link>
                <Link to="/performance">Past Performance</Link>
                <Link to="/pay-now">Pay Now</Link>
                <Link to="/unlisted-shares">Unlisted Shares</Link>
                <Link to="/contact">Contact Us</Link>

                <hr />

                <Button variant="outline">Open Free Demat</Button>
                <Button>Start Free Trial</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
