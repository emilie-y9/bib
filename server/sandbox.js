/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const BibG_link='https://guide.michelin.com/fr/fr/ile-de-france/restaurants/bib-gourmand';

//for a particular restaurant
async function sandbox (searchLink = 'https://guide.michelin.com/fr/fr/centre-val-de-loire/veuves/restaurant/l-auberge-de-la-croix-blanche') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeRestaurant(searchLink);

    console.log(restaurant);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//for all restaurants
async function sandboxBibGList (searchLink = BibGlink) {
    
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeBibGList(searchLink);

    // console.log(restaurant);
    // console.log('done');
    
    return restaurant;
    // process.exit(0);
  } catch (e) {
    // console.error(e);
    // process.exit(1);
    return {};
  }
}

const [,, searchLink] = process.argv;

sandbox(searchLink);
