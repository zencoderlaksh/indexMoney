import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Building2, Info, Linkedin, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    source: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`Index Money Contact - ${form.subject || 'Inquiry'}`);
    const mailBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSource: ${form.source}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:Support@indexmoney.in?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 pb-20">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 max-w-6xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">Get in touch</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Talk to <em className="text-blue-600 italic">Index Money</em>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Tell our team what you’d like to buy or sell and we’ll share the current indicative price and walk you through the share. Reaching out is an enquiry, not an order.
        </p>
      </section>

      {/* Main Content Area */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_450px] gap-12">
          
          {/* Left Column - Contact Info */}
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Reach us directly</h2>
              <p className="text-gray-600">Prefer not to fill a form? Any of these reach the same team.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-gray-700" strokeWidth={1.8} />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Office</div>
                  <div className="text-gray-900 font-medium">142, Dhule, Maharashtra - 424001, India</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="w-6 h-6 text-gray-700" strokeWidth={1.8} />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</div>
                  <div className="text-blue-600 font-medium hover:underline">
                    <a href="mailto:Support@indexmoney.in">Support@indexmoney.in</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Building2 className="w-6 h-6 text-gray-700" strokeWidth={1.8} />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Operated by</div>
                  <div className="text-gray-900 font-medium">Index Money Advisory Services</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-start text-sm text-gray-600">
              <Info className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
              <p>Index Money is an information platform and is not a SEBI-recognised stock exchange. All prices are indicative and not an offer to deal.</p>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Where did you find us? <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <select 
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="Google">Google</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Reference">Reference</option>
                  <option value="Newspaper">Newspaper</option>
                  <option value="Word of mouth">Word of mouth</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your message</label>
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us a bit more…" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#B89047] hover:bg-[#a37f3d] text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
              >
                Submit message
              </button>
              
              <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
                🔒 Your information is secure and will never be shared with third parties. Submitting starts a conversation with our team — it is an enquiry, not an order.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="bg-gray-50 py-24 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-2 block">Stay connected</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Follow <em className="text-gray-500 font-serif">Index Money</em></h2>
            <p className="text-gray-600 text-lg">Research, market updates and IPO alerts — wherever you spend your time.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-start relative overflow-hidden">
              <div className="text-[#0077b5] mr-4 mt-1">
                <Linkedin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">LinkedIn</h3>
                <p className="text-sm text-gray-500">Follow for research & company deep-dives</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M7 17 17 7M9 7h8v8"></path></svg>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-start relative overflow-hidden">
              <div className="text-[#E1306C] mr-4 mt-1">
                <Instagram className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Instagram</h3>
                <p className="text-sm text-gray-500">Market snippets, reels & stories</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M7 17 17 7M9 7h8v8"></path></svg>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-start relative overflow-hidden">
              <div className="text-[#FF0000] mr-4 mt-1">
                <Youtube className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">YouTube</h3>
                <p className="text-sm text-gray-500">Walkthroughs, explainers & webinars</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M7 17 17 7M9 7h8v8"></path></svg>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-start relative overflow-hidden">
              <div className="text-gray-900 mr-4 mt-1">
                <Twitter className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">X (Twitter)</h3>
                <p className="text-sm text-gray-500">Live updates & market commentary</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M7 17 17 7M9 7h8v8"></path></svg>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-start relative overflow-hidden">
              <div className="text-[#0088cc] mr-4 mt-1">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21.8 4.2 2.9 11.5c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 1.9 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.3 4.8 3.6c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5z" fill="currentColor" stroke="none"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Telegram</h3>
                <p className="text-sm text-gray-500">Instant alerts on prices & IPOs</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M7 17 17 7M9 7h8v8"></path></svg>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-start relative overflow-hidden">
              <div className="text-[#25D366] mr-4 mt-1">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">WhatsApp Channel</h3>
                <p className="text-sm text-gray-500">Join our channel for price & IPO alerts</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M7 17 17 7M9 7h8v8"></path></svg>
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
