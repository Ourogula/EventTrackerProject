console.log('Script.js loaded');
//Display:None can hide elements!

window.addEventListener('load', (event) => {
	onInit();
})

function onInit() {
	document.getElementById(`createFormButton`).addEventListener('click', function(e) {
		e.preventDefault();
		createRace();
	});
	loadRaces();
}

function loadRaces() {
	insertSeries(document.getElementById(`creationSeriesSelections`));
	insertLanguages(document.getElementById(`creationLanguageSelections`));

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/races');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let races = JSON.parse(xhr.responseText);
				displayRaces(races);
			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			}
		}
	}
	xhr.send();
}

//Display all races
function displayRaces(races) {
	//Dictionary objects for language and series counts
	seriesCounts = {};
	languageCounts = {};
	
	//Clear out the old data for the tables
	let seriesStatsTableBody = document.getElementById('seriesStatistics').firstElementChild.nextElementSibling;
	while (seriesStatsTableBody.firstElementChild) {
		seriesStatsTableBody.removeChild(seriesStatsTableBody.firstChild);
	}
	let languageStatsTableBody = document.getElementById('languageStatistics').firstElementChild.nextElementSibling;
	while (languageStatsTableBody.firstElementChild) {
		languageStatsTableBody.removeChild(languageStatsTableBody.firstChild);
	}
	let racesTableBody = document.getElementById('raceTable').firstElementChild.nextElementSibling;
	while (racesTableBody.firstElementChild) {
		racesTableBody.removeChild(racesTableBody.firstChild);
	}

	//Insert fresh data for the tables
	for (let race of races) {
		let tr = document.createElement('tr');
		
		//Add event to display full details of a race when clicked
		tr.addEventListener('click', function(e) {
			let updateForm = document.getElementById('updateTitle');
			updateForm.firstElementChild.nextElementSibling.reset();
			updateForm.style = 'display:none;';
			
			let raceId = e.target.parentElement.firstElementChild.textContent;
			displaySingleRace(raceId);
		});

		//Build the basic race table
		let id = document.createElement('td');
		id.textContent = race.id;
		id.id = "race" + race.id;
		tr.appendChild(id);

		let name = document.createElement('td');
		name.textContent = race.name;
		tr.appendChild(name);

		//Update functionality
		let updateCell = document.createElement('td');
		updateCell.textContent = 'UPDATE';
		updateCell.addEventListener('click', function(e) {
			let raceId = e.target.parentElement.firstElementChild.textContent;

			getSingleRace(raceId);
		})
		tr.appendChild(updateCell);

		//Delete functionality
		let deleteCell = document.createElement('td');
		deleteCell.textContent = 'DELETE';
		deleteCell.addEventListener('click', function(e) {
			let raceId = e.target.parentElement.firstElementChild.textContent;
			deleteRace(raceId);
		})
		tr.appendChild(deleteCell);


		document.getElementById('raceTable').firstElementChild.nextElementSibling.appendChild(tr);

		if (seriesCounts[race.series.name]) {
			seriesCounts[race.series.name] += 1;
		} else {
			seriesCounts[race.series.name] = 1;
		}
		if(languageCounts[race.language.name]) {
			languageCounts[race.language.name] += 1;
		} else {
			languageCounts[race.language.name] = 1;
		}
	}
	for (let s in seriesCounts) {
		let tr = document.createElement('tr');
		let ser = document.createElement('td');
		ser.textContent = s;
		tr.appendChild(ser);
		let num = document.createElement('td');
		num.textContent = seriesCounts[s];
		tr.appendChild(num);
		let stats = document.getElementById('seriesStatistics').firstElementChild.nextElementSibling;
		stats.appendChild(tr);
	}
	for (let l in languageCounts) {
		let tr = document.createElement('tr');
		let ser = document.createElement('td');
		ser.textContent = l;
		tr.appendChild(ser);
		let num = document.createElement('td');
		num.textContent = languageCounts[l];
		tr.appendChild(num);
		let stats = document.getElementById('languageStatistics').firstElementChild.nextElementSibling;
		stats.appendChild(tr);
	}

}

//Display a single race's full details
function displaySingleRace(raceId) {
	while (document.getElementById('singleRaceTable').firstElementChild.nextElementSibling.firstElementChild) {
		document.getElementById('singleRaceTable').firstElementChild.nextElementSibling.removeChild(document.getElementById('singleRaceTable').firstElementChild.nextElementSibling.firstChild);
	}

	let xhr = new XMLHttpRequest();

	//Update to take in the id of the clicked row
	xhr.open('GET', 'api/races/' + raceId);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let table = document.getElementById('singleRaceTable');
				let race = JSON.parse(xhr.responseText);
				let tr = document.createElement('tr');
				let id = document.createElement('td');
				id.textContent = race.id;
				tr.appendChild(id);
				let name = document.createElement('td');
				name.textContent = race.name;
				tr.appendChild(name);
				let description = document.createElement('td');
				description.textContent = race.description;
				tr.appendChild(description);
				let lore = document.createElement('td');
				lore.textContent = race.lore;
				tr.appendChild(lore);
				let personTraits = document.createElement('td');
				personTraits.textContent = race.personalityTraits;
				tr.appendChild(personTraits);
				let physTraits = document.createElement('td');
				physTraits.textContent = race.physicalTraits;
				tr.appendChild(physTraits);
				let planet = document.createElement('td');
				planet.textContent = race.planet;
				tr.appendChild(planet);
				let region = document.createElement('td');
				region.textContent = race.region;
				tr.appendChild(region);
				let language = document.createElement('td');
				language.textContent = race.language.name;
				tr.appendChild(language);
				let series = document.createElement('td');
				series.textContent = race.series.name;
				tr.appendChild(series);

				table.style = '';
				table.firstElementChild.nextElementSibling.appendChild(tr);
			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			}
		}
	}
	xhr.send();

}

//Create a new race from a form
function createRace() {

	let createForm = document.getElementById(`createRaceForm`);

	let race = {
		name: createForm.name.value,
		description: createForm.description.value,
		lore: createForm.lore.value,
		personalityTraits: createForm.personalityTraits.value,
		physicalTraits: createForm.physicalTraits.value,
		plane: createForm.planet.value,
		region: createForm.region.value,
		series: {

			id: document.getElementById(`creationSeriesSelections`).value
		},
		language: {
			id: document.getElementById(`creationLanguageSelections`).value
		}
	}

	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'api/races');
	xhr.setRequestHeader('Content-type', 'application/json');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let race = JSON.parse(xhr.responseText);
				loadRaces();
				displaySingleRace(race.id);
			} else {
				console.error('POST request failed');
				console.error(xhr.status + ': ' + xhr.responseText);

			}
		}
	}
	xhr.send(JSON.stringify(race));

}

//Show update Race Form
function updateRaceForm(raceId, raceDefaults) {
	insertSeries(document.getElementById(`updateSeriesSelections`));
	insertLanguages(document.getElementById(`updateLanguageSelections`));

	let updateForm = document.getElementById(`updateRaceForm`);
	updateForm.reset();
	updateForm.parentElement.style = '';
	updateForm.name = raceId;

	let updateButton = document.getElementById(`updateFormButton`);

	if (raceDefaults.description) {
		updateForm.description.value = raceDefaults.description;
	}
	if (raceDefaults.lore) {
		updateForm.lore.value = raceDefaults.lore;
	}
	if (raceDefaults.personalityTraits) {
		updateForm.personalityTraits.value = raceDefaults.personalityTraits;
	}
	if (raceDefaults.physicalTraits) {
		updateForm.physicalTraits.value = raceDefaults.physicalTraits;
	}
	if (raceDefaults.planet) {
		updateForm.planet.value = raceDefaults.planet;
	}
	if (raceDefaults.region) {
		updateForm.region.value = raceDefaults.region;
	}
	/*if (raceDefaults.series.id) {
		for (let ser of document.getElementById('updateSeriesSelections').children) {
			if (ser.value === raceDefaults.series.id) {
				ser.selected = true;
			}
		}
		[raceDefaults.series.id].selected = 'true';
	}
	if (raceDefaults.language.id) {
		updateForm.language = raceDefaults.language.id;
	}*/


	updateButton.addEventListener('click', function(e) {
		updateRace(e.target.parentElement.name);
		console.log(e.target.parentElement.name)
	})
}

//Update a race from a form
function updateRace(raceId) {
	let updateForm = document.getElementById(`updateRaceForm`);
	let race = {
		id: raceId,
		name: document.getElementById("race" + raceId).nextElementSibling.textContent,
		description: updateForm.description.value,
		lore: updateForm.lore.value,
		personalityTraits: updateForm.personalityTraits.value,
		physicalTraits: updateForm.physicalTraits.value,
		plane: updateForm.planet.value,
		region: updateForm.region.value,
		series: {

			id: document.getElementById(`updateSeriesSelections`).value
		},
		language: {
			id: document.getElementById(`updateLanguageSelections`).value
		}
	}

	let xhr = new XMLHttpRequest();

	xhr.open('PUT', 'api/races/' + raceId);
	xhr.setRequestHeader('Content-type', 'application/json');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 202) {
				let race = JSON.parse(xhr.responseText);
				updateForm.parentElement.style = 'display:none;';
				updateForm.reset();
				let raceTableBody = document.getElementById('raceTable').firstElementChild.nextElementSibling;
				while (raceTableBody.firstElementChild) {
					raceTableBody.removeChild(raceTableBody.firstChild);
				}
				loadRaces();
			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			}
		}
	}
	xhr.send(JSON.stringify(race));
}

//Delete a race
function deleteRace(raceId) {
	let xhr = new XMLHttpRequest();

	xhr.open('DELETE', 'api/races/' + raceId);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 204) {
				let raceTableBody = document.getElementById('raceTable').firstElementChild.nextElementSibling;
				while (raceTableBody.firstElementChild) {
					raceTableBody.removeChild(raceTableBody.firstChild);
				}
				loadRaces();
			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			} else {
				console.log('Bad Request');
			}
		}
	}
	xhr.send();
}

//Grab languages for form input
function insertLanguages(div) {
	while (div.firstElementChild) {
		div.removeChild(div.firstChild);
	}

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/languages');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let languages = JSON.parse(xhr.responseText);
				for (let lang of languages) {
					option = document.createElement(`option`);
					option.value = lang.id;
					option.textContent = lang.name;
					option.name = lang.name;
					div.appendChild(option);
				}

			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			}
		}
	}
	xhr.send();
}

//Grab series for form input
function insertSeries(div) {
	while (div.firstElementChild) {
		div.removeChild(div.firstChild);
	}

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/series');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let series = JSON.parse(xhr.responseText);

				for (let s of series) {
					option = document.createElement(`option`);
					option.value = s.id;
					option.textContent = s.name;
					option.name = s.name;
					div.appendChild(option);
				}

			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			}
		}
	}
	xhr.send();
}

//Get Single Race for update params
function getSingleRace(raceId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/races/' + raceId);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let race = JSON.parse(xhr.responseText);
				updateRaceForm(raceId, race);
			} else if (xhr.status === 404) {
				let raceData = document.getElementById('raceData');
				raceData.textContent = 'Race not found';
			}
		}
	}
	xhr.send();
}