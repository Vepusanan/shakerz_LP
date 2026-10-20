export const site = {
  name: 'Shakerz',
  description: 'Shakerz — milkshakes and snacks in Jaffna, Sri Lanka.',
  locale: 'en_LK',
};

// Add verified street address, telephone and opening hours when supplied.
export function localBusiness(url: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': new URL('#business', url).href,
    name: site.name,
    url: url.href,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaffna',
      addressCountry: 'LK',
    },
  };
}

export const serializeJsonLd = (value: Record<string, unknown>) =>
  JSON.stringify(value).replace(/</g, '\\u003c');
