import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import { promises as fs } from 'fs';
import { navigationData } from '../src/data/navigation';

interface RouteTestResult {
  route: string;
  status: number;
  success: boolean;
  error?: string;
  responseTime?: number;
}

interface RouteTestReport {
  timestamp: string;
  totalRoutes: number;
  passedRoutes: number;
  failedRoutes: number;
  results: RouteTestResult[];
  summary: {
    successRate: string;
    averageResponseTime: string;
  };
}

test.describe('Route Status Testing', () => {
  const allRoutes: string[] = [];
  const testResults: RouteTestResult[] = [];

  // Collect all routes from navigation data
  test.beforeAll(() => {
    // Add primary routes
    navigationData.primary.forEach(item => {
      if (!item.external) {
        allRoutes.push(item.path);
        
        // Add child routes
        if (item.children) {
          item.children.forEach(child => {
            if (!child.external) {
              allRoutes.push(child.path);
            }
          });
        }
      }
    });

    // Add secondary routes
    navigationData.secondary.forEach(item => {
      if (!item.external) {
        allRoutes.push(item.path);
      }
    });

    // Add additional routes that might exist
    const additionalRoutes = [
      '/faq',
      '/services/custom-ai-automations'
    ];

    additionalRoutes.forEach(route => {
      if (!allRoutes.includes(route)) {
        allRoutes.push(route);
      }
    });

    console.log(`Testing ${allRoutes.length} routes:`, allRoutes);
  });

  test('should check all route statuses', async ({ page }) => {
    for (const route of allRoutes) {
      const startTime = Date.now();
      let result: RouteTestResult;

      try {
        console.log(`Testing route: ${route}`);
        
        const response = await page.goto(route, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (response) {
          const status = response.status();
          result = {
            route,
            status,
            success: status === 200,
            responseTime
          };

          if (status !== 200) {
            result.error = `HTTP ${status}`;
          }
        } else {
          result = {
            route,
            status: 0,
            success: false,
            error: 'No response received',
            responseTime: Date.now() - startTime
          };
        }
      } catch (error) {
        result = {
          route,
          status: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          responseTime: Date.now() - startTime
        };
      }

      testResults.push(result);
      
      // Assert for Playwright test reporting
      expect(result.success, `Route ${route} failed with status ${result.status}: ${result.error || 'Unknown error'}`).toBe(true);
    }
  });

  test.afterAll(async () => {
    // Ensure test-results directory exists
    try {
      await fs.mkdir('./test-results', { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Generate JSON report
    const passedRoutes = testResults.filter(r => r.success).length;
    const failedRoutes = testResults.filter(r => !r.success).length;
    const totalResponseTime = testResults.reduce((sum, r) => sum + (r.responseTime || 0), 0);
    const averageResponseTime = totalResponseTime / testResults.length;

    const report: RouteTestReport = {
      timestamp: new Date().toISOString(),
      totalRoutes: testResults.length,
      passedRoutes,
      failedRoutes,
      results: testResults,
      summary: {
        successRate: `${((passedRoutes / testResults.length) * 100).toFixed(1)}%`,
        averageResponseTime: `${averageResponseTime.toFixed(0)}ms`
      }
    };

    // Write JSON report
    await fs.writeFile('./test-results/route-status-report.json', JSON.stringify(report, null, 2));

    // Generate HTML report
    const htmlReport = generateHtmlReport(report);
    await fs.writeFile('./test-results/route-status-report.html', htmlReport);

    console.log('\n📊 Route Testing Summary:');
    console.log(`✅ Passed: ${passedRoutes}/${testResults.length} routes`);
    console.log(`❌ Failed: ${failedRoutes}/${testResults.length} routes`);
    console.log(`📈 Success Rate: ${report.summary.successRate}`);
    console.log(`⚡ Average Response Time: ${report.summary.averageResponseTime}`);
    console.log('\n📄 Reports generated:');
    console.log('  - test-results/route-status-report.json');
    console.log('  - test-results/route-status-report.html');
  });
});

function generateHtmlReport(report: RouteTestReport): string {
  const failedRoutes = report.results.filter(r => !r.success);
  const passedRoutes = report.results.filter(r => r.success);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Route Status Report - SoleScope Studio & Design</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { 
            font-size: 2.5rem; 
            font-weight: 700; 
            margin-bottom: 10px;
            background: linear-gradient(135deg, #6C3EF0, #B39CFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header p { color: #9ca3af; font-size: 1.1rem; }
        .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
            margin-bottom: 40px; 
        }
        .stat-card { 
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px; 
            padding: 24px; 
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .stat-number { 
            font-size: 2.5rem; 
            font-weight: 700; 
            margin-bottom: 8px;
        }
        .stat-label { color: #9ca3af; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .success { color: #10b981; }
        .error { color: #ef4444; }
        .warning { color: #f59e0b; }
        .section { 
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px; 
            padding: 32px; 
            margin-bottom: 32px;
            backdrop-filter: blur(10px);
        }
        .section h2 { 
            font-size: 1.5rem; 
            font-weight: 600; 
            margin-bottom: 24px;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .route-list { display: grid; gap: 12px; }
        .route-item { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 16px 20px; 
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            transition: all 0.2s ease;
        }
        .route-item:hover { 
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
        }
        .route-path { 
            font-family: 'Monaco', 'Menlo', monospace; 
            font-size: 0.9rem;
            color: #e5e7eb;
        }
        .route-status { 
            display: flex; 
            align-items: center; 
            gap: 8px;
            font-weight: 600;
            font-size: 0.85rem;
        }
        .status-badge { 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-200 { background: #10b981; color: #ffffff; }
        .status-error { background: #ef4444; color: #ffffff; }
        .response-time { color: #9ca3af; font-size: 0.8rem; }
        .timestamp { 
            text-align: center; 
            color: #6b7280; 
            font-size: 0.9rem; 
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .no-routes { 
            text-align: center; 
            color: #9ca3af; 
            font-style: italic; 
            padding: 40px;
        }
        @media (max-width: 768px) {
            .container { padding: 20px 16px; }
            .header h1 { font-size: 2rem; }
            .stats-grid { grid-template-columns: 1fr; }
            .route-item { flex-direction: column; align-items: flex-start; gap: 8px; }
            .route-status { align-self: flex-end; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Route Status Report</h1>
            <p>SoleScope Studio & Design - Navigation Testing Results</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number success">${report.passedRoutes}</div>
                <div class="stat-label">Routes Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number error">${report.failedRoutes}</div>
                <div class="stat-label">Routes Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.totalRoutes}</div>
                <div class="stat-label">Total Routes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number ${report.summary.successRate === '100.0%' ? 'success' : report.failedRoutes > 0 ? 'error' : 'warning'}">${report.summary.successRate}</div>
                <div class="stat-label">Success Rate</div>
            </div>
        </div>

        ${passedRoutes.length > 0 ? `
        <div class="section">
            <h2>✅ Passed Routes (${passedRoutes.length})</h2>
            <div class="route-list">
                ${passedRoutes.map(route => `
                <div class="route-item">
                    <span class="route-path">${route.route}</span>
                    <div class="route-status">
                        <span class="status-badge status-200">200 OK</span>
                        <span class="response-time">${route.responseTime}ms</span>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${failedRoutes.length > 0 ? `
        <div class="section">
            <h2>❌ Failed Routes (${failedRoutes.length})</h2>
            <div class="route-list">
                ${failedRoutes.map(route => `
                <div class="route-item">
                    <span class="route-path">${route.route}</span>
                    <div class="route-status">
                        <span class="status-badge status-error">${route.status || 'ERROR'}</span>
                        <span class="response-time">${route.error || 'Unknown error'}</span>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="timestamp">
            Report generated on ${new Date(report.timestamp).toLocaleString()}
        </div>
    </div>
</body>
</html>`;
}