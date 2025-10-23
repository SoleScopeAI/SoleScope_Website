import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import '../styles/blog-galaxy.css';

const BlogPage = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeCategory, setActiveCategory] = useState('All');

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const blogPosts = [
    {
      title: "How AI is Transforming Small Business Marketing in 2025",
      excerpt: "Discover the latest AI tools and strategies that are helping sole traders and small businesses compete with larger companies in the digital space.",
      author: "Sarah Chen",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "AI & Technology",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "The Complete Guide to Local SEO for Service Businesses",
      excerpt: "Everything you need to know about ranking higher in local search results and attracting more customers in your area.",
      author: "Marcus Thompson",
      date: "January 12, 2025",
      readTime: "8 min read",
      category: "SEO & Marketing",
      image: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "5 Website Mistakes That Are Costing You Customers",
      excerpt: "Common website issues that drive potential customers away and how to fix them to increase your conversion rates.",
      author: "Emma Rodriguez",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Web Design",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Automation Tools Every Small Business Should Use",
      excerpt: "A comprehensive look at the best automation tools for streamlining your business operations and saving time.",
      author: "James Wilson",
      date: "January 8, 2025",
      readTime: "7 min read",
      category: "Automation",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Building Trust Online: Brand Identity for Service Businesses",
      excerpt: "How to create a professional brand identity that builds trust and attracts your ideal customers.",
      author: "Emma Rodriguez",
      date: "January 5, 2025",
      readTime: "5 min read",
      category: "Branding",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "The Future of Customer Service: AI Chatbots for Small Business",
      excerpt: "How AI chatbots are revolutionizing customer service for small businesses and improving customer satisfaction.",
      author: "Sarah Chen",
      date: "January 3, 2025",
      readTime: "6 min read",
      category: "AI & Technology",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const categories = ["All", "AI & Technology", "SEO & Marketing", "Web Design", "Automation", "Branding"];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
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
          type: 'newsletter',
          data: {
            email: newsletterEmail
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setNewsletterEmail('');
      } else {
        throw new Error(result.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="blog-surface pt-24 pb-20">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Insights & Resources</h1>
            <p>
              Expert insights, practical tips, and industry trends to help your service business thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="blog-category-filter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section ref={ref} className="blog-cards-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="blog-refined-card blog-post-card"
              >
                <div className="post-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image w-full aspect-video object-cover"
                  />
                </div>

                <div className="post-metadata">
                  <span className="category-badge">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="post-title">
                  {post.title}
                </h2>

                <p className="post-excerpt">
                  {post.excerpt}
                </p>

                <div className="post-footer">
                  <div className="post-author">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <button className="post-link">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="blog-newsletter-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="blog-newsletter-card"
          >
            <h2>Stay Updated</h2>
            <p>
              Get the latest insights and tips delivered to your inbox. No spam, just valuable content for your business.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="blog-newsletter-form">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="blog-newsletter-input"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="blog-newsletter-btn"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="blog-message blog-message-success"
              >
                Thank you for subscribing! You'll receive our latest insights and tips.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="blog-message blog-message-error"
              >
                There was an error subscribing. Please try again or contact us directly.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;