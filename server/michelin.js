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
  var address= $('.restaurant-details__heading > ul > li:nth-child(1)').text();
  if (address.includes('Offre\n')||address.includes('Offres\n'))
  {
    var offre = true;
  address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(2)').text()
  }
  var price_min= $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('\n')[2];
  if (price_min!=undefined)
  { price_min=price_min.trim();
  }
  var price_max = $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('\n')[5];

  if (price_max !=undefined)
  {
   price_max= price_max.trim();
  } 
    var type = $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('•')[1];
    
if(type!=undefined)
{
   type = type.trim();
}

    const street =address.split(',')[0];

    
  var city =address.split(',')[1];
  if (city!=undefined)
  {
    city = city.trim();
  }

  var postal_code =address.split(',')[2];
  if (postal_code!=undefined)
  {
    postal_code=postal_code.trim();
  }

  var state= address.split(',')[6];

  if (offre)
  {
    state = address.split(',')[3];
  }
  
  const tel= $('.section-main span.flex-fill').text().substring(0,17);
  var feedback = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.section.section-main.restaurant-details__main > div.restaurant-details__description > div.restaurant-details__description--text.js-show-description > div > p').text();
  if (feedback!=undefined)
  {
    feedback = feedback.trim();
  }
  var comfort_level =$('#experience-section > ul > li:nth-child(2)').text().split('\n')[2];
  if (comfort_level!=undefined)
  {
    comfort_level=comfort_level.trim();
  }
  const website = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div.collapse__block-item.link-item > a').attr('href');
  return {name, website, type, street, city, postal_code,state,tel,comfort_level, price_min,price_max,feedback};
};

//parse web list of a page
const parseBibGList = data => {
  
  const $ = cheerio.load(data);
  let listOfLinks = $('.card__menu > a').map(function(i, el) {
    return $(this).attr('href');
  }).toArray();  
  for (let i = 0; i < listOfLinks.length; i++) {
    listOfLinks[i] ='https://guide.michelin.com' + listOfLinks[i];}
return listOfLinks;
}

const numberPage = data => {  
const $ = cheerio.load(data);
const numberRestaurantsNotCleaned =  $('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status.box-placeholder > div.flex-fill.js-restaurant__stats > h1').text();
const numberRestaurants = parseFloat(numberRestaurantsNotCleaned.split('sur ')[1].split(' r')[0]);
const NPage = Math.ceil(numberRestaurants/40);

return NPage;
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

module.exports.scrapeBibGListRestaurants = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseBibGList(data);
  }

  console.error(status);

  return null;
};


module.exports.scrapeResultsPageExist = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return resultsPageExist(data);
  }


  console.error(status);

  return null;
};

module.exports.scrapeNumberPage= async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return numberPage(data);
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
