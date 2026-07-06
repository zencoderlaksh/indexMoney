import { Link } from "react-router-dom";
import { IMAGES } from "../constants/images";

const Footer = () => {
  return (
    <footer className="bg-[#001233] text-slate-300 border-t border-[#002855]/40 mt-20">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 block w-fit">
              <img
                src={IMAGES.logo}
                alt="Index Money"
                className="h-12 w-36 object-contain object-left filter brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-7 text-slate-400 max-w-sm">
              An information platform for unlisted, pre-IPO and ESOP shares in India. 
              We provide company research and indicative prices, and help connect buyers 
              with sellers. We are not a stock exchange and do not operate a trading platform.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Explore</h3>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              <Link to="/unlisted-shares" className="hover:text-[#0466c8] transition-colors">All shares</Link>
              <Link to="/sectors" className="hover:text-[#0466c8] transition-colors">Sectors</Link>
              <Link to="/drhp-filed" className="hover:text-[#0466c8] transition-colors">DRHP filed</Link>
              <Link to="/knowledge-center" className="hover:text-[#0466c8] transition-colors">Knowledge center</Link>
              <Link to="/research" className="hover:text-[#0466c8] transition-colors">Research</Link>
              <Link to="/media" className="hover:text-[#0466c8] transition-colors">Media coverage</Link>
              <Link to="/unlisted-shares" className="hover:text-[#0466c8] transition-colors">Screener</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h3>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-[#0466c8] transition-colors">About us</Link>
              <Link to="/" className="hover:text-[#0466c8] transition-colors">Our products</Link>
              <Link to="/" className="hover:text-[#0466c8] transition-colors">Become a partner</Link>
              <Link to="/" className="hover:text-[#0466c8] transition-colors">Official bank accounts</Link>
              <Link to="/" className="hover:text-[#0466c8] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal</h3>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              <Link to="/disclaimer" className="hover:text-[#0466c8] transition-colors">Disclaimer</Link>
              <Link to="/terms-and-conditions" className="hover:text-[#0466c8] transition-colors">Terms of use</Link>
              <Link to="/privacy-policy" className="hover:text-[#0466c8] transition-colors">Privacy policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-[11px] leading-6 text-slate-500">
          <p>
            <strong className="text-slate-400">Important — please read. </strong>
            www.IndexMoney.com (operated by Index Money Pvt. Ltd.) is <strong className="text-slate-400">not</strong> a stock exchange 
            or trading platform recognised by SEBI under the Securities Contracts (Regulation) Act, 1956, and does 
            <strong className="text-slate-400"> not</strong> permit secondary-market trading on the platform. We are not SEBI-registered investment advisers, 
            brokers or portfolio managers. All content — including company data, valuations and indicative prices — is for informational 
            and educational only and is <strong className="text-slate-400">not</strong> investment, financial, legal or tax advice. Indicative prices are 
            not an offer to buy or sell and may differ from any price at which a deal is actually concluded. Investing in unlisted 
            shares carries substantial risk, including risk of loss of capital, illiquidity, valuation uncertainty and no guarantee of 
            any IPO. <strong className="text-slate-400">Past performance does not indicate future results. </strong> Conduct your own due 
            diligence and consult SEBI-registered advisers before any investment. Visiting this site or contacting us creates no 
            advisory, broker or fiduciary relationship.
          </p>
          <p className="mt-4 text-slate-600">
            © {new Date().getFullYear()} Index Money. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
