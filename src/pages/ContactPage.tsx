import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Paperclip,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Building,
  Zap,
  Target,
  Shield,
  ArrowRight,
  FileText,
  X,
  ExternalLink
} from "lucide-react";
import InteractiveMap from '../components/InteractiveMap';
import '../styles/contact-galaxy.css';

const ContactPage = () => {
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
    website: '', // honeypot
    timestamp: Date.now()
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-contact');
    return () => {
      document.body.classList.remove('page-contact');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-spam checks
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
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('attachment') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const metrics = [
    {
      value: "< 24h",
      label: "First Reply SLA",
      description: "founder-led comms"
    },
    {
      value: "2–4 weeks",
      label: "Avg. Kickoff",
      description: "scope → live"
    },
    {
      value: "99.9%",
      label: "Workflow Uptime",
      description: "monitored"
    },
    {
      value: "↓ admin",
      label: "Owner Time Saved",
      description: "triage & CRM-lite"
    }
  ];

  const channels = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@solescope.co.uk",
      description: "Primary contact method",
      link: "mailto:contact@solescope.co.uk"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 20 1234 5678",
      description: "Mon–Fri 09:00–17:00 (UK)",
      link: "tel:+442012345678"
    },
    {
      icon: Calendar,
      title: "Quick Call",
      value: "Book 15-min discovery",
      description: "Free consultation",
      link: "/contact"
    }
  ];

  const faqs = [
    {
      question: "How fast can we start?",
      answer: "Usually within 1–2 weeks after discovery. We prioritize quick turnarounds while ensuring quality delivery."
    },
    {
      question: "Do you work beyond sole traders?",
      answer: "SMEs welcome; focus is micro/small services. We specialize in businesses with 1-20 employees who need practical digital solutions."
    },
    {
      question: "Do you host/maintain?",
      answer: "Yes—tiered plans; you own your assets. We provide fully managed hosting with different support levels to match your needs."
    }
  ];

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
    <main id="contact" className="contact-surface pt-24 pb-20">
      {/* Compact Header */}
      <header className="container contact-header mobile-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mobile-h1">Contact SoleScope</h1>
          <p className="mobile-body-text">Tell me what you need and I'll reply with next steps—usually within one business day.</p>
        </motion.div>
      </header>

      {/* Contact Cards Surface */}
      <section className="contact-cards-surface">
        <div className="container mobile-container">
          {/* Contact Grid */}
          <div className="contact-grid mobile-single-col">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="contact-refined-card"
            >
              {submitStatus === 'success' ? (
                <div className="success-card">
                  <div className="success-icon">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="success-title">Thanks!</h3>
                  <p className="success-message">I'll reply within one working day.</p>
                  <p className="success-submessage">Check your email for confirmation.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-8">
                    <MessageSquare className="h-6 w-6 text-white" />
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                      Send a Message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="contact-form">
                    {/* Honeypot field (hidden) */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="form-grid mobile-single-col">
                      <div className="field-group">
                        <label htmlFor="name" className="field-label">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="field-input mobile-touch-target"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="field-group">
                        <label htmlFor="email" className="field-label">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="field-input mobile-touch-target"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="form-grid mobile-single-col">
                      <div className="field-group">
                        <label htmlFor="phone" className="field-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="field-input mobile-touch-target"
                          placeholder="+44 20 1234 5678"
                        />
                      </div>

                      <div className="field-group">
                        <label htmlFor="company" className="field-label">Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="field-input mobile-touch-target"
                          placeholder="Your business name"
                        />
                      </div>
                    </div>

                    <div className="form-grid mobile-single-col">
                      <div className="field-group">
                        <label htmlFor="projectType" className="field-label">Project Type *</label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="field-select mobile-touch-target"
                        >
                          <option value="">Select project type...</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="field-group">
                        <label htmlFor="budget" className="field-label">Budget Range</label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="field-select mobile-touch-target"
                        >
                          <option value="">Select budget...</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="timeline" className="field-label">Timeline</label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="field-select mobile-touch-target"
                      >
                        <option value="">Select timeline...</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label htmlFor="message" className="field-label">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="field-input field-textarea mobile-touch-target"
                        placeholder="Tell me about your project, goals, and how I can help transform your business..."
                      />
                    </div>

                    {/* File Upload */}
                    <div className="field-group">
                      <label htmlFor="attachment" className="field-label">Attachment (Optional)</label>
                      <div className="file-upload-area" onClick={() => document.getElementById('attachment')?.click()}>
                        <Paperclip className="file-upload-icon" />
                        <p className="file-upload-text">
                          {selectedFile ? selectedFile.name : 'Click to upload file'}
                        </p>
                        <p className="file-upload-hint">PDF, PNG, JPG • Max 10MB</p>
                      </div>
                      <input
                        type="file"
                        id="attachment"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      {selectedFile && (
                        <div className="file-selected">
                          <div className="file-info">
                            <FileText className="h-4 w-4" />
                            <span>{selectedFile.name}</span>
                            <span className="text-xs">({(selectedFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                          </div>
                          <button type="button" onClick={removeFile} className="file-remove">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        className="checkbox-input"
                      />
                      <div>
                        <label htmlFor="consent" className="checkbox-label">
                          I agree to be contacted about my enquiry. *
                        </label>
                        <p className="checkbox-description">
                          We'll only use your details to respond to your enquiry.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.consent}
                      className="contact-btn-primary mobile-touch-target"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="h-5 w-5" />
                    </button>

                    {/* Alternative Action */}
                    <div className="text-center">
                      <a href="mailto:contact@solescope.co.uk" className="contact-btn-secondary">
                        Or email Kevin directly
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-message"
                      >
                        ✗ There was an error sending your message. Please try again or email us directly.
                      </motion.div>
                    )}
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Details */}
            <motion.aside
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="contact-refined-card"
            >
              {/* Photo Placeholder */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600/30 to-purple-700/30 border-2 border-white/20 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white/60" />
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                  You'll reach Kevin Hannah
                </h2>
              </div>

              <p className="text-white mb-8 leading-relaxed">
                Specialising in practical AI and modern web design for UK sole traders and small service businesses.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:contact@solescope.co.uk" className="channel-link">contact@solescope.co.uk</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Response</p>
                    <p className="text-white/80">{'Typically < 24h'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Hours</p>
                    <p className="text-white/80">Mon–Fri 09:00–17:00 (UK)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Area</p>
                    <p className="text-white/80">UK-wide • Hatfield & Sandy bases</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Metrics & SLAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="metrics-grid mobile-double-col"
          >
            {metrics.map((metric, index) => (
              <div key={metric.label} className="contact-refined-card metric-card">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-description">{metric.description}</div>
              </div>
            ))}
          </motion.div>

          {/* Alternative Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="channels-grid mobile-single-col"
          >
            {channels.map((channel, index) => (
              <div key={channel.title} className="contact-refined-card channel-card">
                <div className="channel-icon">
                  <channel.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="channel-title">{channel.title}</h3>
                <p className="channel-value">
                  {channel.link ? (
                    <a href={channel.link} className="channel-link">{channel.value}</a>
                  ) : (
                    channel.value
                  )}
                </p>
                <p className="channel-description">{channel.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Mini-FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Quick Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="faq-button"
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>
                    {activeFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-content"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Area with Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-6 w-6 text-white" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Service Area</h3>
            </div>
            <p className="text-white mb-4 leading-relaxed">
              UK-wide coverage • Remote-first with in-person visits by arrangement.
            </p>

            <InteractiveMap
              center={[-0.213, 51.761]}
              zoom={6.5}
              className="mb-4"
            />

            <div className="map-caption">
              <h4>Head Office — Hatfield, Hertfordshire</h4>
              <p>Visits by appointment only. We operate across the UK.</p>
              <a
                href="https://www.google.com/maps/place/Hatfield,+UK/@51.761,-0.213,12z"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Get Directions</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="contact-refined-card text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready to move forward?
          </h2>
          <p className="text-white/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Let's discuss your project and create a solution that transforms your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <a
              href="/contact"
              className="contact-btn-primary"
            >
              <Calendar className="h-5 w-5" />
              Book a Discovery Call
            </a>
            <a
              href="mailto:contact@solescope.co.uk"
              className="contact-btn-secondary"
            >
              <Mail className="h-5 w-5" />
              Email Kevin
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;