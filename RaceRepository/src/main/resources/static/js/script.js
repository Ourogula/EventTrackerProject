console.log('Script.js loaded');

window.addEventListener('load', (event) => {
	onInit();
})

function onInit() {
	loadRaces();
}

function loadRaces() {
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

function displayRaces(races) {
	let ul = document.createElement('ul');
	for (let race of races) {
			let li = document.createElement('li');
			li.textContent = race.name;
			ul.appendChild(li);
	}
	document.getElementById('raceData').appendChild(ul);	
}