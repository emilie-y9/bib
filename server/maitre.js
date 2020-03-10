const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */


const parseNumberPages = data => {
    const $ = cheerio.load(data);
   //var numberResults = $('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-3.annuaire_sidebar > div > div.col-md-12 > div.title1.nbresults.hide_desk').text().trim().split(' ')[0];('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-3.annuaire_sidebar > div > div.col-md-12 > div.title1.nbresults.hide_desk').text().trim().split(' ')[0];
   var numberResults =  $('body > div.col-md-9 > div.annuaire_result_topbar > div.row ').text().trim().substring(0,4);
  console.log("var number results");
   console.log(numberResults);
   numberResults=parseInt(numberResults);
   console.log(numberResults);  

const numberPage = Math.ceil(numberResults/10);
    return numberPage;

  };

//All URL of maitre restaurants of one page
const parseListURL = data => {

  const $ = cheerio.load(data);
  var web_links=$('.single_libel a').map(function(i, el) {
        return $(this).attr('href');
      }).toArray();


  var length=web_links.length;
  for (let i = 0; i < length; i++) {
      web_links[i]="https://www.maitresrestaurateurs.fr"+web_links[i];
  }

  return web_links;
};




const parseRestaurant= data => {

  const $ = cheerio.load(data);

  const name= $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5 > span:nth-child(1) > strong').text();

  const infos= $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5').text().split('\n');
  
  var street=infos[11];
  if (street !=undefined)
  {
    street=street.trim();
  }
  var postal_code=infos[14]
  if (postal_code!=undefined)
  {
     postal_code= postal_code.trim();
  }
  var city=infos[15]
  if (city != undefined)
  {

  city = city.trim();
  }


  var tel_mobile= infos[28]
  if (tel_mobile!=undefined)
   {tel_mobile=tel_mobile.trim().replace(/,/g, '').split(" ").join("");
  tel_mobile="+33"+tel_mobile.substring(1,10);
   }
  var tel_square= infos[29];
  if (tel_square!=undefined)
{tel_square = tel_square.trim().replace(/,/g, '').split(" ").join("");
  tel_square="+33"+tel_square.substring(1,10)
  }
var website = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5 > a').attr('href');
  return {name,website,street,city,postal_code,tel_mobile,tel_square};
};







/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */

 
module.exports.scrapePage = async page => {
  const payload={
    'page': page,
    'request_id': '278bfeb7f527fd4e48916fce8323396e'
  };
  const options ={
    'url': 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
    'method': 'POST',
    'headers': {'content-type': 'application/x-www-form-urlencoded'},
    'data': querystring.stringify(payload)

  };

  const response = await axios(options);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseListURL(data);
  }

  console.error(status);

  return null;
};

module.exports.scrapeNumberPage= async page => {
  const payload={
    'page': page,
    'request_id': '278bfeb7f527fd4e48916fce8323396e'
  };
  const options ={
    'url': 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
    'method': 'POST',
    'headers': {'content-type': 'application/x-www-form-urlencoded'},
    'data': querystring.stringify(payload)

  };

  const response = await axios(options);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseNumberPages(data);
  }


  console.error(status);

  return null;
};



module.exports.scrapeMaitresRestaurateurs = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseRestaurant(data);
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

