import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-20 border-t">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Index Money</h2>
            <p className="text-sm text-muted-foreground">
              Professional Index & F&O advisory platform focused on structured,
              technical and risk-managed trading strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/unlisted-shares">Unlisted Shares</Link>
              <Link to="/services">Services</Link>
              <Link to="/performance">Past Performance</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>

          {/* Plans */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/disclaimer">Disclaimer</Link>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Support Hours:</p>
              <p>9:00 AM – 6:00 PM</p>
              <p>Email: support@indexmoney.com</p>
              <p>Phone: +91-XXXXXXXXXX</p>

              {/* Social Icons */}
              <div className="flex gap-3 pt-3">
                <Facebook className="h-4 w-4 cursor-pointer" />
                <Instagram className="h-4 w-4 cursor-pointer" />
                <Linkedin className="h-4 w-4 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          <p>
            Investments in securities market are subject to market risks. Please
            read all related documents carefully before investing.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Index Money. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
