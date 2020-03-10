/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const BibGLink='https://guide.michelin.com/fr/fr/restaurants/bib-gourmand';
//for a particular restaurant
async function sandbox (searchLink = BibGLink) {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeBibGListRestaurant(searchLink);

    console.log(restaurant);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, searchLink] = process.argv;

sandbox(searchLink);
