const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();
  const address= $('.restaurant-details__heading > ul > li:nth-child(1)').text();
  const price= $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text()
  const street =address.split(',')[0];
  const city =address.split(',')[1];
  const postal_code =address.split(',')[2];
  const state= address.split(',')[3];
  const tel= $('.section-main span.flex-fill').text().substring(0,17);
  const feedback = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.section.section-main.restaurant-details__main > div.restaurant-details__description > div.restaurant-details__description--text.js-show-description > div > p').text()
  return {name, experience, price, street, city, postal_code,state,tel,feedback};
};

const parseBibGlist = data => {
  const $ = cheerio.load(data);
}


/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

module.exports.scrapeBibGList = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseBibGList(data);
  }

  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
