// Redirect mapping for old URLs to new canonical paths
export const redirectMap: Record<string, string> = {
  // Legacy service paths
  '/website-design': '/services/website-design',
  '/custom-webapps': '/services/custom-webapps',
  '/ai-dashboards': '/services/ai-dashboards',
  '/brand-identity': '/services/brand-identity',
  '/ai-automations': '/services/ai-automations',
  '/custom-ai-automations': '/services/ai-automations',
  
  // Legacy resource paths
  '/blog': '/resources/blog',
  '/case-studies': '/resources/case-studies',
  '/guides': '/resources/guides',
  
  // SEO and marketing legacy paths
  '/seo': '/services/website-design',
  '/digital-marketing': '/services/ai-automations',
  
  // Other legacy paths
  '/faq': '/resources/guides'
};

// Function to handle redirects
export const handleRedirect = (pathname: string): string | null => {
  return redirectMap[pathname] || null;
};

// Function to check if a path needs redirect
export const needsRedirect = (pathname: string): boolean => {
  return pathname in redirectMap;
};