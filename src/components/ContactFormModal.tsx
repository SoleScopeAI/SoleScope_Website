import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Mail,
  User,
  Building,
  MessageSquare,
  Phone,
  Paperclip,
  FileText,
  Check,
  AlertCircle
} from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    consent: false,
    website: '',
    timestamp: Date.now()
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(prev => ({ ...prev, timestamp: Date.now() }));
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setSubmitStatus('error');
      return;
    }

    const fillTime = Date.now() - formData.timestamp;
    if (fillTime < 5000) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

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
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            projectType: formData.projectType,
            budget: formData.budget,
            timeline: formData.timeline,
            message: formData.message,
            hasAttachment: selectedFile ? true : false,
            fileName: selectedFile?.name || null
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          consent: false,
          website: '',
          timestamp: Date.now()
        });
        setSelectedFile(null);
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('modal-attachment') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const projectTypes = [
    "Website Design & Hosting",
    "Custom WebApps & Hosting",
    "AI Dashboards & Analytics",
    "Custom AI Automations",
    "Brand Identity & Visuals",
    "Multiple Services",
    "Not Sure - Need Consultation"
  ];

  const budgetRanges = [
    "Under £1k",
    "£1k - £3k",
    "£3k - £8k",
    "£8k+",
    "Need guidance"
  ];

  const timelineOptions = [
    "ASAP",
    "1-2 months",
    "3-6 months",
    "Exploring options"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
            style={{
              boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 100px rgba(34, 211, 238, 0.2)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/10 to-emerald-500/5 rounded-3xl pointer-events-none" />

            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 group"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="relative p-8 md:p-12">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)' }}
                  >
                    <Check className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-xl text-white/80 mb-2">Thanks for reaching out!</p>
                  <p className="text-white/60">I'll reply within one working day.</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 via-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center"
                      style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                    >
                      <MessageSquare className="h-8 w-8 text-white" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 uppercase tracking-wide">
                      Get In Touch
                    </h2>
                    <p className="text-white/70 text-lg">
                      Tell me about your project and I'll reply within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="modal-name" className="block text-sm font-semibold text-white mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                          <input
                            type="text"
                            id="modal-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="Your name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="modal-email" className="block text-sm font-semibold text-white mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                          <input
                            type="email"
                            id="modal-email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="modal-phone" className="block text-sm font-semibold text-white mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                          <input
                            type="tel"
                            id="modal-phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="+44 20 1234 5678"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="modal-company" className="block text-sm font-semibold text-white mb-2">
                          Company
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                          <input
                            type="text"
                            id="modal-company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="Your business name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="modal-projectType" className="block text-sm font-semibold text-white mb-2">
                          Project Type *
                        </label>
                        <select
                          id="modal-projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                        >
                          <option value="" className="bg-slate-900">Select type...</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type} className="bg-slate-900">{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="modal-budget" className="block text-sm font-semibold text-white mb-2">
                          Budget Range
                        </label>
                        <select
                          id="modal-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                        >
                          <option value="" className="bg-slate-900">Select budget...</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range} className="bg-slate-900">{range}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="modal-timeline" className="block text-sm font-semibold text-white mb-2">
                          Timeline
                        </label>
                        <select
                          id="modal-timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                        >
                          <option value="" className="bg-slate-900">Select timeline...</option>
                          {timelineOptions.map((option) => (
                            <option key={option} value={option} className="bg-slate-900">{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modal-message" className="block text-sm font-semibold text-white mb-2">
                        Message *
                      </label>
                      <textarea
                        id="modal-message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project and how I can help..."
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-attachment" className="block text-sm font-semibold text-white mb-2">
                        Attachment (Optional)
                      </label>
                      <div
                        onClick={() => document.getElementById('modal-attachment')?.click()}
                        className="relative p-6 bg-white/5 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Paperclip className="h-8 w-8 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
                          <p className="text-white/70 text-sm font-medium">
                            {selectedFile ? selectedFile.name : 'Click to upload file'}
                          </p>
                          <p className="text-white/40 text-xs">PDF, PNG, JPG • Max 10MB</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="modal-attachment"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      {selectedFile && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center justify-between p-3 bg-white/10 rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-purple-400" />
                            <span className="text-white text-sm">{selectedFile.name}</span>
                            <span className="text-white/40 text-xs">
                              ({(selectedFile.size / 1024 / 1024).toFixed(1)}MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                          >
                            <X className="h-4 w-4 text-white/60" />
                          </button>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="modal-consent"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 bg-white/5 border border-white/20 rounded focus:ring-2 focus:ring-purple-400"
                      />
                      <label htmlFor="modal-consent" className="text-sm text-white/80">
                        I agree to be contacted about my enquiry. We'll only use your details to respond to your message.
                      </label>
                    </div>

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
                      >
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <p className="text-red-200 text-sm">
                          There was an error sending your message. Please try again or email us directly.
                        </p>
                      </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.consent}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold text-lg rounded-xl uppercase tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        style={{
                          boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <Send className="h-5 w-5 relative z-10" />
                      </motion.button>

                      <a
                        href="mailto:contact@solescope.co.uk"
                        className="flex items-center justify-center space-x-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
                      >
                        <Mail className="h-5 w-5" />
                        <span>Email Direct</span>
                      </a>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;
