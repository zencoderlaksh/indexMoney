import React from "react";
import { Link } from "react-router-dom";
import { Search, Shield, Users, Smartphone, TrendingUp, CheckCircle, BarChart3, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 max-w-6xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">Who we are</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          We put India’s private market <br className="hidden md:block" />
          <em className="text-blue-600 italic">in plain sight.</em>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Since 2018, Index Money has brought research, indicative prices and honest answers to a market that traded in the dark — <b>one of India’s largest and most trusted platforms</b> for unlisted, pre-IPO and ESOP shares.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="bg-blue-50 px-6 py-3 rounded-full border border-blue-100 flex items-center shadow-sm hover:shadow-md transition">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-800"><b>2018</b> founded</span>
          </div>
          <div className="bg-blue-50 px-6 py-3 rounded-full border border-blue-100 flex items-center shadow-sm hover:shadow-md transition">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-800"><b>30L+</b> visitors served</span>
          </div>
          <div className="bg-blue-50 px-6 py-3 rounded-full border border-blue-100 flex items-center shadow-sm hover:shadow-md transition">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-800"><b>3L+</b> every month</span>
          </div>
          <div className="bg-blue-50 px-6 py-3 rounded-full border border-blue-100 flex items-center shadow-sm hover:shadow-md transition">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-800"><b>500+</b> shares tracked</span>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4">What we stand for</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-snug text-gray-800">
            Every company <span className="underline decoration-blue-400">researched</span>.<br/>
            Every price <span className="underline decoration-blue-400">published</span> — indicative and honest.<br/>
            Every investor treated <em className="text-blue-600">fairly</em>.
          </h2>
        </div>
      </section>

      {/* Timeline / Story Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="space-y-24">
          
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-2 block">2018 · Where it began</span>
              <h3 className="text-3xl font-bold mb-4">A market that traded <em className="text-gray-500 font-serif">in the shadows</em></h3>
              <p className="text-gray-600 mb-4 text-lg">
                India’s unlisted and pre-IPO shares changed hands through phone calls and hearsay — opaque pricing, thin research, and no single place an investor could trust.
              </p>
              <p className="text-gray-600 text-lg">
                Three friends — <b>Neha Soni, Adam and Sarah</b> — decided the private market deserved the same rigour, data and honesty as public markets.
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="text-gray-400 text-sm mb-6 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                The market, before
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-500 font-mono">████ ███████ Ltd</span>
                  <span className="text-red-400 font-mono">₹ ???</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-500 font-mono">██████ ██ Ltd</span>
                  <span className="text-red-400 font-mono">₹ ???</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-mono">███ ████████</span>
                  <span className="text-red-400 font-mono">₹ ???</span>
                </div>
              </div>
              <p className="text-gray-500 mt-8 text-sm italic">No published prices. No research. No accountability.</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-2 block">What we built</span>
              <h3 className="text-3xl font-bold mb-4">Research first, <em className="text-blue-600 font-serif">transparency</em> always</h3>
              <p className="text-gray-600 mb-4 text-lg">
                Engineering from the Army Institute of Technology met 15+ years of capital-markets depth. The result: every company researched, every price indicative and clearly published, every investor treated fairly.
              </p>
              <p className="text-gray-600 text-lg">
                <b>We are, first and last, an information platform</b> — we publish researched data and indicative prices for information and education. We are not a stock exchange and do not operate a trading platform.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl md:order-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-full -ml-16 -mt-16 blur-2xl"></div>
              <div className="text-gray-500 text-sm mb-6 flex items-center relative z-10">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                With Index Money
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">NI</div>
                    <span className="font-semibold text-gray-800">NSE India Ltd</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold hidden sm:block">RESEARCHED</span>
                    <span className="font-bold text-gray-900">₹3,095</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">SM</div>
                    <span className="font-semibold text-gray-800">SBI Mutual Fund</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold hidden sm:block">RESEARCHED</span>
                    <span className="font-bold text-gray-900">₹1,575</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-xs">ZP</div>
                    <span className="font-semibold text-gray-800">Zepto</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold hidden sm:block">RESEARCHED</span>
                    <span className="font-bold text-gray-900">₹899</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mt-6 text-sm italic relative z-10">Published indicative prices · free research · clear disclaimers.</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-2 block">Today</span>
              <h3 className="text-3xl font-bold mb-4">Trusted by <em className="text-gray-500 font-serif">lakhs</em>, growing every month</h3>
              <p className="text-gray-600 mb-4 text-lg">
                What began as a bold idea now serves <b>30 lakh+ visitors</b> — 3 lakh+ every single month — across research, indicative prices, events and the Index Money platform.
              </p>
              <p className="text-gray-600 text-lg">
                Operated by IZUZ Consultancy Pvt. Ltd. and the InvestorZone partnership.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-100">
              <div className="text-gray-600 text-sm mb-8 font-semibold">Visitors served, cumulative</div>
              <div className="flex items-end space-x-2 h-40 border-b border-gray-200 pb-2 mb-4">
                <div className="w-1/5 bg-blue-200 rounded-t-md hover:bg-blue-300 transition" style={{ height: '14%' }}></div>
                <div className="w-1/5 bg-blue-300 rounded-t-md hover:bg-blue-400 transition" style={{ height: '30%' }}></div>
                <div className="w-1/5 bg-blue-400 rounded-t-md hover:bg-blue-500 transition" style={{ height: '55%' }}></div>
                <div className="w-1/5 bg-blue-500 rounded-t-md hover:bg-blue-600 transition" style={{ height: '78%' }}></div>
                <div className="w-1/5 bg-blue-600 rounded-t-md shadow-lg" style={{ height: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-500">
                <span>2019</span>
                <span>2021</span>
                <span>2023</span>
                <span>2025</span>
                <span className="text-blue-700">Today</span>
              </div>
              <div className="mt-8 flex items-end justify-center space-x-2">
                <span className="text-5xl font-extrabold text-gray-900">30<em className="text-blue-600 font-serif">L+</em></span>
                <span className="text-gray-500 font-medium pb-2">and counting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Founders */}
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase mb-2 block">The founders</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built by <em className="text-blue-400 font-serif">three friends</em> with one standard</h2>
            <p className="text-gray-400 text-lg">Research, transparency and investors first — since day one.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition shadow-lg border border-gray-700 text-center md:text-left">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center text-3xl font-bold text-gray-400">NS</div>
              <h3 className="text-xl font-bold mb-1">Neha Soni</h3>
              <span className="text-blue-400 text-sm font-semibold block mb-4">Co-founder</span>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Brings engineering excellence from the Army Institute of Technology — turning deep company data into clear, honest research.
              </p>
              <a href="#" className="inline-flex items-center text-gray-300 hover:text-white text-sm font-medium transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                LinkedIn
              </a>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition shadow-lg border border-gray-700 text-center md:text-left">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center text-3xl font-bold text-gray-400">A</div>
              <h3 className="text-xl font-bold mb-1">Adam</h3>
              <span className="text-blue-400 text-sm font-semibold block mb-4">Co-founder</span>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Also from the Army Institute of Technology — pairing engineering with a passion for making India's private market accessible to every investor.
              </p>
              <a href="#" className="inline-flex items-center text-gray-300 hover:text-white text-sm font-medium transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                LinkedIn
              </a>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition shadow-lg border border-gray-700 text-center md:text-left">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center text-3xl font-bold text-gray-400">S</div>
              <h3 className="text-xl font-bold mb-1">Sarah</h3>
              <span className="text-blue-400 text-sm font-semibold block mb-4">Co-founder</span>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                15+ years of deep capital-markets expertise, setting the standard for research quality, diligence and client-first execution.
              </p>
              <a href="#" className="inline-flex items-center text-gray-300 hover:text-white text-sm font-medium transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                LinkedIn
              </a>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center max-w-3xl mx-auto text-gray-300">
            <b className="text-white">Two engineers. One markets veteran.</b> Army Institute of Technology discipline meets 15+ years on the trading floor — that mix is why the research is deep and the experience is simple.
          </div>
        </div>
      </section>

      {/* Why Index Money */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-2 block">Why Index Money</span>
          <h2 className="text-3xl md:text-5xl font-bold">Standards we <em className="text-gray-500 font-serif">don’t</em> compromise on</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center md:text-left">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Transparent by default</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No hidden charges. Clear indicative prices, fees and valuations — full visibility, every time.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center md:text-left">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Research-driven</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every company we cover is backed by data, fundamentals and published research — not hype.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center md:text-left">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Trusted at scale</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              30 lakh+ investors served since 2018 — one of India's largest platforms for unlisted shares.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center md:text-left">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Technology-first</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A fast, secure and seamless experience across web and app — the private market, simplified.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-16 text-center">
          <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-8">As featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
            <span className="text-2xl font-bold text-gray-800 font-serif">The Economic Times</span>
            <span className="text-2xl font-bold text-gray-800 font-serif">Financial Express</span>
            <span className="text-2xl font-bold text-gray-800 font-serif">Business Standard</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 pt-8 px-4 text-center">
        <Link to="/unlisted-shares" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
          Explore all shares 
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </section>
      
    </div>
  );
};

export default About;
