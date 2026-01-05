import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Building2, Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    industry: '',
    bestTime: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const industries = [
    'Dog Grooming',
    'Trades & Construction',
    'Healthcare & Clinics',
    'Professional Services',
    'Home Services',
    'Beauty & Wellness',
    'Other',
  ];

  const bestTimes = [
    'Morning (9am-12pm)',
    'Afternoon (12pm-5pm)',
    'Evening (5pm-8pm)',
    'Any time',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('voice_agent_demo_requests')
        .insert([
          {
            name: formData.name,
            business_name: formData.businessName,
            email: formData.email,
            phone: formData.phone,
            industry: formData.industry,
            best_time: formData.bestTime,
            message: formData.message,
            status: 'new',
            source_page: 'ai-voice-agent',
          },
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        industry: '',
        bestTime: '',
        message: '',
      });

      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 3000);
    } catch (error: unknown) {
      console.error('Error submitting demo request:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9000]"
            style={{ top: 0, left: 0, right: 0, bottom: 0, isolation: 'isolate' }}
          />

          <div className="fixed inset-0 flex items-center justify-center z-[9100] p-4 overflow-y-auto" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-modal-title"
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl my-8"
              style={{ isolation: 'isolate', contain: 'layout style paint' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h2 id="demo-modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-2">Book Your Live Demo</h2>
                  <p className="text-slate-400">
                    See the AI Voice Agent in action. We'll walk you through exactly how it works for your business.
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                    <p className="text-slate-400">
                      We'll be in touch within 24 hours to schedule your personalized demo.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-2">
                          Business Name *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Your Business Ltd"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="john@business.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="07XXX XXXXXX"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-2">
                          Industry *
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="">Select your industry</option>
                            {industries.map((industry) => (
                              <option key={industry} value={industry}>
                                {industry}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="bestTime" className="block text-sm font-medium text-slate-300 mb-2">
                          Best Time to Call *
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <select
                            id="bestTime"
                            name="bestTime"
                            value={formData.bestTime}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="">Select a time</option>
                            {bestTimes.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Tell us about your business and what you're looking for..."
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-violet-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Demo'}
                    </button>

                    <p className="text-sm text-slate-500 text-center">
                      We'll respond within 24 hours to schedule your personalized demo
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DemoBookingModal;
