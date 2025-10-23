import { test, expect } from '@playwright/test';
import { navigationData } from '../src/data/navigation';
import navMap from './nav-map.json';

test.describe('Navigation Verification', () => {
  const viewports = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Mobile', width: 390, height: 844 }
  ];

  viewports.forEach(viewport => {
    test.describe(`${viewport.name} Navigation`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      });

      test('should navigate to all primary routes', async ({ page }) => {
        const isMobile = viewport.width < 768;

        for (const item of navigationData.primary) {
          if (item.external) continue;

          if (isMobile) {
            // Open mobile menu
            await page.click('[aria-label*="mobile menu"]');
            await page.waitForSelector('#mobile-menu', { state: 'visible' });
          }

          // Click the navigation item
          const linkSelector = `a[href="${item.path}"]`;
          await page.click(linkSelector);
          
          // Wait for navigation
          await page.waitForURL(`**${item.path}`);
          await page.waitForLoadState('networkidle');

          // Verify we're on the correct page
          expect(page.url()).toContain(item.path);

          // Verify page loads successfully (no 404/500)
          const response = await page.goto(page.url());
          expect(response?.status()).toBe(200);

          // Check for active state in navigation
          if (!isMobile) {
            const activeLink = page.locator(`a[href="${item.path}"][aria-current="page"]`);
            await expect(activeLink).toBeVisible();
          }

          // Go back to home for next test
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        }
      });

      test('should navigate to all service submenu items', async ({ page }) => {
        const servicesItem = navigationData.primary.find(item => item.title === 'Services');
        if (!servicesItem?.children) return;

        const isMobile = viewport.width < 768;

        for (const subItem of servicesItem.children) {
          if (isMobile) {
            // Open mobile menu
            await page.click('[aria-label*="mobile menu"]');
            await page.waitForSelector('#mobile-menu', { state: 'visible' });
          } else {
            // Hover over Services to open dropdown
            await page.hover('a[href="/services"]');
            await page.waitForSelector('[role="menu"]', { state: 'visible' });
          }

          // Click the submenu item
          const linkSelector = `a[href="${subItem.path}"]`;
          await page.click(linkSelector);
          
          // Wait for navigation
          await page.waitForURL(`**${subItem.path}`);
          await page.waitForLoadState('networkidle');

          // Verify we're on the correct page
          expect(page.url()).toContain(subItem.path);

          // Verify page loads successfully
          const response = await page.goto(page.url());
          expect(response?.status()).toBe(200);

          // Go back to home for next test
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        }
      });

      test('should handle keyboard navigation', async ({ page }) => {
        if (viewport.width < 768) {
          // Mobile keyboard navigation
          await page.keyboard.press('Tab'); // Focus mobile menu button
          await page.keyboard.press('Enter'); // Open menu
          await page.waitForSelector('#mobile-menu', { state: 'visible' });
          
          // Navigate through menu items
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
          
          // Should navigate to first menu item
          await page.waitForLoadState('networkidle');
          expect(page.url()).not.toBe('/');
        } else {
          // Desktop keyboard navigation
          await page.keyboard.press('Tab'); // Focus logo
          await page.keyboard.press('Tab'); // Focus first nav item
          await page.keyboard.press('Enter');
          
          // Should navigate
          await page.waitForLoadState('networkidle');
          expect(page.url()).not.toBe('/');
        }
      });

      test('should close mobile menu after navigation', async ({ page }) => {
        if (viewport.width >= 768) return; // Skip for desktop

        // Open mobile menu
        await page.click('[aria-label*="mobile menu"]');
        await page.waitForSelector('#mobile-menu', { state: 'visible' });

        // Click a navigation item
        await page.click('a[href="/about"]');
        await page.waitForURL('**/about');

        // Menu should be closed
        await expect(page.locator('#mobile-menu')).not.toBeVisible();
      });

      test('should handle external links correctly', async ({ page }) => {
        const externalItem = navigationData.secondary.find(item => item.external);
        if (!externalItem) return;

        const isMobile = viewport.width < 768;

        if (isMobile) {
          await page.click('[aria-label*="mobile menu"]');
          await page.waitForSelector('#mobile-menu', { state: 'visible' });
        }

        // Check that external link has correct attributes
        const externalLink = page.locator(`a[href="${externalItem.path}"]`);
        await expect(externalLink).toHaveAttribute('target', '_blank');
        await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  test('should redirect legacy URLs', async ({ page }) => {
    const redirects = navMap.redirects;

    for (const [oldPath, newPath] of Object.entries(redirects)) {
      await page.goto(oldPath);
      await page.waitForLoadState('networkidle');
      
      // Should redirect to new path
      expect(page.url()).toContain(newPath);
      
      // Should return 200 OK
      const response = await page.goto(page.url());
      expect(response?.status()).toBe(200);
    }
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check main navigation has proper ARIA attributes
    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    // Check menubar has proper role
    const menubar = page.locator('[role="menubar"]');
    await expect(menubar).toBeVisible();

    // Check menu items have proper roles
    const menuItems = page.locator('[role="menuitem"]');
    const count = await menuItems.count();
    expect(count).toBeGreaterThan(0);

    // Check submenu accessibility
    await page.hover('a[href="/services"]');
    const submenu = page.locator('[role="menu"]');
    await expect(submenu).toBeVisible();
    await expect(submenu).toHaveAttribute('aria-label');
  });
});