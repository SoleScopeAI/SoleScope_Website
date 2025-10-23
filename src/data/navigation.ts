import { NavigationData } from '../types/navigation';

export const navigationData: NavigationData = {
  primary: [
    {
      title: 'Home',
      path: '/',
      description: 'Homepage with hero section and service overview'
    },
    {
      title: 'Services',
      path: '/services',
      description: 'Our digital solutions',
      children: [
        {
          title: 'All Services',
          path: '/services',
          description: 'Complete service overview'
        },
        {
          title: 'Website Design & Hosting',
          path: '/services/website-design',
          description: 'Professional websites with managed hosting'
        },
        {
          title: 'Custom WebApps',
          path: '/services/custom-webapps',
          description: 'Tailored web applications with hosting'
        },
        {
          title: 'AI Dashboards',
          path: '/services/ai-dashboards',
          description: 'Business intelligence and analytics'
        },
        {
          title: 'Brand Identity & Visuals',
          path: '/services/brand-identity',
          description: 'Logos and visual branding'
        },
        {
          title: 'AI Automations',
          path: '/services/ai-automations',
          description: 'Intelligent business automation'
        }
      ]
    },
    {
      title: 'About',
      path: '/about',
      description: 'Our story and team'
    },
    {
      title: 'Resources',
      path: '/resources',
      description: 'Resource hub with blog, case studies, and guides',
      children: [
        {
          title: 'All Resources',
          path: '/resources',
          description: 'Complete resource overview'
        },
        {
          title: 'Blog',
          path: '/resources/blog',
          description: 'Latest insights and industry trends'
        },
        {
          title: 'Case Studies',
          path: '/resources/case-studies',
          description: 'Client success stories and results'
        },
        {
          title: 'Guides',
          path: '/resources/guides',
          description: 'How-to guides and tutorials'
        }
      ]
    },
    {
      title: 'Pricing',
      path: '/pricing',
      description: 'Service packages and pricing information'
    },
    {
      title: 'Contact',
      path: '/contact',
      description: 'Get in touch with us'
    }
  ],
  secondary: [
    {
      title: 'Privacy Policy',
      path: '/privacy',
      description: 'Privacy policy and data protection information'
    },
    {
      title: 'Terms of Service',
      path: '/terms',
      description: 'Terms and conditions of service'
    },
    {
      title: 'Client Portal',
      path: 'https://ClientPortal.solescope.co.uk',
      external: true,
      description: 'External client dashboard and portal'
    }
  ]
};