/**
 * ONE place for every Amazon link on the site.
 * Client only needs to edit this file: put the real ASIN of each product below.
 *
 * - productUrl : opens the Amazon product page (customer can Buy Now / Subscribe & Save there)
 * - cartUrl    : adds 1 unit straight into the Amazon cart, so the customer lands on checkout
 */

const AMAZON_DOMAIN = 'https://www.amazon.com';

/**
 * Launch switch. While false, every Amazon button on the site reads "Coming Soon on Amazon"
 * and is not clickable, and the "Add to Amazon Cart" buttons are hidden.
 * TODO client: set to true on launch day (after adding the real ASINs below).
 */
export const AMAZON_LIVE: boolean = false;

// TODO client: replace with real ASINs (10 characters, e.g. B0XXXXXXXX)
export const ASIN = {
  womensMulti: 'XXXXXXXXXX',
  mensMulti: 'XXXXXXXXXX',
};

// TODO client: replace with the Amazon Brand Store URL (falls back to Amazon search until then)
export const AMAZON_STORE_URL = `${AMAZON_DOMAIN}/s?k=ONCE+HEALTH+multivitamin`;

export const amazonProductUrl = (asin: string): string => `${AMAZON_DOMAIN}/dp/${asin}`;

export const amazonCartUrl = (asin: string, quantity = 1): string =>
  `${AMAZON_DOMAIN}/gp/aws/cart/add.html?ASIN.1=${asin}&Quantity.1=${quantity}`;

export const AMAZON_SUPPORT_URL = `${AMAZON_DOMAIN}/gp/help/customer/display.html`;
