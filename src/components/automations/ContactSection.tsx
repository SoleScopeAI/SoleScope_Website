import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    companySize: '',
    serviceInterest: '',
    message: ''
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.businessName,
            projectType: `${formData.serviceInterest} - Company Size: ${formData.companySize}`,
            message: formData.message,
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          businessName: '',
          email: '',
          phone: '',
          companySize: '',
          serviceInterest: '',
          message: ''
        });
        setFileName('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-16">
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide">
            Let's Start Your AI Journey
          </h2>
          <p className="text-base text-white opacity-80 max-w-3xl mx-auto">
            Share your requirements and we'll map out your automation opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="services-refined-card space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                    placeholder="john@acme.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                    placeholder="07447 180903"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Company Size *</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="" className="bg-gray-900">Select size</option>
                    <option value="sole-trader" className="bg-gray-900">Sole Trader</option>
                    <option value="small-business" className="bg-gray-900">Small Business (2-10)</option>
                    <option value="sme" className="bg-gray-900">SME (11-50)</option>
                    <option value="enterprise" className="bg-gray-900">Enterprise (50+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Service Interest *</label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="" className="bg-gray-900">Select service</option>
                    <option value="automation" className="bg-gray-900">Automation</option>
                    <option value="ai-system" className="bg-gray-900">AI System</option>
                    <option value="dashboard" className="bg-gray-900">Dashboard</option>
                    <option value="consultation" className="bg-gray-900">Consultation</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-500 resize-none"
                  placeholder="Tell us about your automation needs..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Attach File (optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
                  >
                    <Upload className="h-4 w-4" />
                    {fileName || 'Choose file'}
                  </label>
                  {fileName && (
                    <button
                      type="button"
                      onClick={() => setFileName('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-5 w-5" />
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg text-center"
                >
                  <p className="text-white font-semibold">Thank you! We'll be in touch shortly.</p>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-center"
                >
                  <p className="text-white font-semibold">There was an error sending your message. Please try again.</p>
                </motion.div>
              )}
            </form>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="services-refined-card">
              <Phone className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Prefer a Call?</h3>
              <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                Book a Discovery Session — we'll map your automation opportunities in real time.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Schedule a Call
              </Link>
            </div>

            <div className="services-refined-card">
              <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">What Happens Next?</h4>
              <div className="space-y-3">
                {[
                  { step: 1, text: 'We review your requirements within 24 hours' },
                  { step: 2, text: 'Schedule a discovery call to explore opportunities' },
                  { step: 3, text: 'Receive a tailored proposal with timeline and pricing' },
                  { step: 4, text: 'Begin development with regular progress updates' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <span className="text-xs font-bold text-purple-300">{item.step}</span>
                    </div>
                    <p className="text-sm text-slate-300 mt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
