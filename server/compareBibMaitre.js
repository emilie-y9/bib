const fs = require('fs');
function compareJSON() {
	// import the datas
	let rawdata = fs.readFileSync('./files/MaitresRestaurateurs.json');
	let maitresRestaurateursRestaurants = JSON.parse(rawdata);
	rawdata = fs.readFileSync('./files/BibGRestaurantsInfos.json');
	let bibRestaurants = JSON.parse(rawdata);
	var i, j;
	let restaurantsList = [];
	for (i = 0; i < maitresRestaurateursRestaurants.length; i++) {
		for (j = 0; j < bibRestaurants.length; j++) {
		/* 	if (bibRestaurants[j].website != undefined && maitresRestaurateursRestaurants[j].website != undefined) {
				if (bibRestaurants[j].website.localeCompare(maitresRestaurateursRestaurants[j].website) == 0) {
					var restaurant = bibRestaurants[j];
					var ok = true;


					restaurantsList.forEach(element => {
						if (element == restaurant) {
							ok = false;
						}

					})

					if (ok) {
						restaurantsList.push(restaurant);
					}
				}
 		} */
			//else {
				if (bibRestaurants[j].tel != undefined) { 
					if ((bibRestaurants[j].tel.split(" ").join("") == maitresRestaurateursRestaurants[i].tel_mobile) || (bibRestaurants[j].tel.split(" ").join("") == maitresRestaurateursRestaurants[i].tel_square)
						|| (bibRestaurants[j].name.localeCompare(maitresRestaurateursRestaurants[i].name, 'fr', { sensitivity: 'base' }) == 0)
						|| (bibRestaurants[j].street.localeCompare(maitresRestaurateursRestaurants[i].street, 'fr', { sensitivity: 'base' }) == 0)) {
						var ok = true;
						var restaurant = bibRestaurants[j];
						restaurantsList.forEach(element => {
							if (element == restaurant) {
								ok = false;
							}
						})
						if (ok) {
							restaurantsList.push(restaurant);
						}
					}
				}
		//	}
		}
	}
	// console.log(restaurantsList);
	console.log(restaurantsList.length);

	// export in JSON
	fs.writeFile('./files/MaitresBibRestaurants.json', JSON.stringify(restaurantsList), (err) => {
		if (err) throw err;
		console.log('Data written to file');
	});
}
compareJSON();