module.exports = {
  siteUrl: 'https://3zzo.com',
  generateRobotsTxt: true,
  exclude: ['/privacy-policy', '/login'],      // أمثلة على صفحات تستثنيها
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://3zzo.com/sitemap-0.xml',
      'https://3zzo.com/extra-sitemap.xml',
    ]
  }
}
