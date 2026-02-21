import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-serif font-bold text-center mb-16">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Get in Touch</h3>
            <p className="text-gray-600 mb-8">
              We are here to assist you with any inquiries regarding our products, orders, or services. 
              Our dedicated concierge team is available Monday through Friday, 9am to 6pm EST.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="mt-1 text-gold-400" />
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wide">Phone</h4>
                  <p className="text-gray-600">+92 331 3812232</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="mt-1 text-gold-400" />
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wide">Showroom</h4>
                  <p className="text-gray-600">
                    Multan<br />
                    Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-50 p-8 rounded-sm">
          <form 
            action="https://formsubmit.co/el/gahafi" 
            method="POST" 
            className="space-y-6"
          >
            {/* Honeypot to prevent spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            
            {/* Disable Captcha */}
            <input type="hidden" name="_captcha" value="false" />

            {/* Redirect to same page after submission (optional, or remove to see default success page) */}
            {/* <input type="hidden" name="_next" value={`${window.location.origin}/contact`} /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select 
                name="subject" 
                className="w-full px-4 py-3 border border-gray-300 bg-white focus:border-black focus:ring-0 transition-colors"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Status">Order Status</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Press & Media">Press & Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                name="message" 
                rows={6} 
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors"
              ></textarea>
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
