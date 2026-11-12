/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://3zzo.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.6,
  trailingSlash: false,
  exclude: ['/api/*'],
  // Push the two money pages (strategy + bot) to the top of the crawl priority.
  transform: async (config, path) => {
    const priorities = { '/': 1.0, '/Indicator': 0.95, '/Options': 0.95, '/FuturesAndFundedAccounts': 0.8 };
    return {
      loc: path,
      changefreq: priorities[path] >= 0.9 ? 'daily' : config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
