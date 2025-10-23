import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, ArrowRight } from 'lucide-react';

interface ProposalFormProps {
  selectedAutomations: string[];
}

const ProposalForm: React.FC<ProposalFormProps> = ({ selectedAutomations }) => {
  const commonTools = [
    'HubSpot', 'Salesforce', 'Pipedrive', 'Slack', 'Microsoft Teams',
    'Notion', 'Airtable', 'Google Workspace', 'Office 365', 'Zapier',
    'Stripe', 'PayPal', 'Xero', 'QuickBooks', 'Calendly', 'Zoom', 'Other'
  ];

  const turnoverRanges = [
    'Under £50k',
    '£50k - £100k',
    '£100k - £250k',
    '£250k - £500k',
    '£500k - £1M',
    'Over £1M',
    'Prefer not to say'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    tools: [] as string[],
    otherTools: '',
    turnover: '',
    dontKnow: false,
    description: '',
    automations: selectedAutomations
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [websiteError, setWebsiteError] = useState('');

  // Update automations when selectedAutomations prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      automations: selectedAutomations
    }));
  }, [selectedAutomations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          type: 'proposal',
          data: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            website: formData.website,
            tools: formData.tools,
            otherTools: formData.otherTools,
            turnover: formData.turnover,
            dontKnow: formData.dontKnow,
            description: formData.description,
            automations: selectedAutomations.length > 0 ? selectedAutomations : formData.automations
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setSubmitStatus('success');
      } else {
        throw new Error(result.error || 'Failed to send proposal');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Website field validation
    if (name === 'website') {
      if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
        setWebsiteError('Website URL must start with http:// or https://');
      } else {
        setWebsiteError('');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const toggleTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool]
    }));
  };

  if (isSubmitted) {
    return (
      <section id="proposal-form" className="py-20 premium-bg relative overflow-hidden">
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center dark-card rounded-2xl p-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold dark-text-primary mb-4">
              Thank You!
            </h2>
            <p className="text-xl dark-text-body mb-6">
              We'll reply within 1 business day with a custom automation proposal.
            </p>
            <p className="dark-text-muted">
              Check your email for confirmation and next steps.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="proposal-form" className="py-20 premium-bg relative overflow-hidden">
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          className="text-center dark-card"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold dark-text-primary mb-6">
            Request Your Custom Proposal
          </h2>
          <p className="text-xl dark-text-body max-w-3xl mx-auto">
            Tell us about your business and we'll create a tailored automation strategy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dark-card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold dark-text-primary mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full dark-input"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold dark-text-primary mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full dark-input"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-semibold dark-text-primary mb-2 text-center">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full dark-input"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-semibold dark-text-primary mb-2 text-center">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full dark-input"
                  style={{ pointerEvents: 'auto' }}
                  placeholder="https://yourwebsite.com"
                  autoComplete="url"
                  inputMode="url"
                />
                {websiteError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {websiteError}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="turnover" className="block text-sm font-semibold dark-text-primary mb-2 text-center">
                Rough Business Turnover (Annual)
              </label>
              <select
                id="turnover"
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                className="w-full dark-input"
              >
                <option value="">Select turnover range...</option>
                {turnoverRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 p-4 dark-surface-alt border border-white/10">
                <input
                  type="checkbox"
                  id="dontKnow"
                  name="dontKnow"
                  checked={formData.dontKnow}
                  onChange={handleChange}
                  className="w-4 h-4 text-accent-primary bg-gray-700 border-gray-600 focus:ring-accent-primary focus:ring-2 rounded"
                />
                <label htmlFor="dontKnow" className="text-sm font-medium dark-text-primary">
                  I don't know what I need - just help me automate my business
                </label>
              </div>

              {!formData.dontKnow && (
                <div>
                  <label className="block text-sm font-semibold dark-text-primary mb-4 text-center">
                Your Tools (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {commonTools.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`p-3 border-2 transition-all duration-200 text-sm font-medium text-center ${
                          formData.tools.includes(tool)
                            ? 'border-accent-primary bg-accent-primary/20 dark-text-primary'
                            : 'dark-card hover:border-accent-primary hover:dark-text-primary'
                        }`}
                        data-analytics={`tool-toggle-${tool.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                  
                  {formData.tools.includes('Other') && (
                    <div className="mt-4">
                      <label htmlFor="otherTools" className="block text-sm font-medium dark-text-primary mb-2 text-center">
                        Please specify other tools
                      </label>
                      <input
                        type="text"
                        id="otherTools"
                        name="otherTools"
                        value={formData.otherTools}
                        onChange={handleChange}
                        className="w-full dark-input"
                        placeholder="e.g., Custom CRM, Industry-specific software..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold dark-text-primary mb-2 text-center">
                {formData.dontKnow ? 'Describe your business and what you\'d like to automate *' : 'What needs automating? *'}
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={formData.dontKnow ? 6 : 4}
                value={formData.description}
                onChange={handleChange}
                className="w-full dark-input resize-none"
                placeholder={formData.dontKnow 
                  ? "Tell us about your business, current challenges, and what you'd like to improve or automate..."
                  : "Describe your current manual processes and what you'd like to automate..."
                }
              />
            </div>

            {/* Hidden field for automation selections */}

            {/* Show selected automations if any */}
            {!formData.dontKnow && selectedAutomations.length > 0 && (
              <div className="dark-surface-alt border border-white/10 p-4">
                <h4 className="text-sm font-semibold dark-text-primary mb-2 text-center">
                  Selected Automations:
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedAutomations.map((automation) => (
                    <span
                      key={automation}
                      className="px-3 py-1 bg-accent-primary text-white text-sm rounded-full text-center"
                    >
                      {automation}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full dark-btn-primary px-8 py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              data-analytics="proposal-form-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  Request Proposal
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-600/20 border border-red-500/30"
              >
                <p className="text-red-400 font-medium text-center">
                  ✗ There was an error submitting your proposal. Please try again or contact us directly at contact@solescope.co.uk
                </p>
              </motion.div>
            )}

            <p className="text-center dark-text-muted text-sm">
              We'll reply within 1 business day with a custom automation proposal
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ProposalForm;