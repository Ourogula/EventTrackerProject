console.log('Script.js loaded');
//Display:None can hide elements!

window.addEventListener('load', (event) => {
	onInit();
})

function onInit() {
	loadRaces();
	document.getElementById(`createFormButton`).addEventListener('click', createRace);
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

//
function displayRaces(races) {
	for (let race of races) {
		let tr = document.createElement('tr');
		
		let id = document.createElement('td');
		id.textContent = race.id;
		tr.appendChild(id);
		
		let name = document.createElement('td');
		name.textContent = race.name;
		tr.appendChild(name);
		
		tr.addEventListener('click', function(e) {
			let raceId = e.target.parentElement.firstElementChild.textContent;
			displaySingleRace(raceId);
		}
		);
		document.getElementById('raceTable').firstElementChild.nextElementSibling.appendChild(tr);;
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
						let series = document.createElement('td');
						series.textContent = race.series.name;
						tr.appendChild(series);
						let language = document.createElement('td');
						language.textContent = race.language.name;
						tr.appendChild(language);

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
	if(createForm.name.value) {
	let x = document.getElementById(`seriesSelections`).value;
			console.log(x);
	let race = {
		name: createForm.name.value,
		description: createForm.description.value,
		lore: createForm.lore.value,
		personalityTraits: createForm.personalityTraits.value,
		physicalTraits: createForm.physicalTraits.value,
		plane: createForm.planet.value,
		region: createForm.region.value,
	    series: {
			
			id: document.getElementById(`seriesSelections`).value
			},
		language: {
			id: document.getElementById(`languageSelections`).value
			}
	}	
	
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'api/races');
	xhr.setRequestHeader('Content-type', 'application/json');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let race = JSON.parse(xhr.responseText);
				/*displaySingleRace(race.id);*/
			} else if (xhr.status === 400) {
				console.error('POST request failed');
				console.error(xhr.status + ': ' + xhr.responseText);

			}
		}
	}
	xhr.send(JSON.stringify(race));
	}
}

//Update a race from a form
function updateRace(raceId) {
	let xhr = new XMLHttpRequest();

	xhr.open('PUT', 'api/races/' + raceId);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 202) {
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

//Delete a race
function deleteRace(raceId) {
	let xhr = new XMLHttpRequest();

	xhr.open('DELETE', 'api/races/' + raceId);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let races = JSON.parse(xhr.responseText);
				displayRaces(races);
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