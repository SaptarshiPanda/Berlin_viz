// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FwdGFyc2hpODQ4NSIsImEiOiJjbGo5ejRtMjYwMzVtM2R1aWh5NjJkZGZ5In0.zF2qD_ukEGnG1JOYLuNOhw';
const bounds = [
	[12.5,50], //NW boundary
	[14.5,54] //SE boundary
];
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [13.40,52.52],
    zoom: 12,
    projection: 'globe', // starting projection
    maxBounds: bounds
});

map.on('load', () => {
	map.addSource('berlin17', {
	type: 'geojson',
	data: 'berlin_2017.geojson'
	});
	map.addLayer({
		id: 'Berlin-2017',
		type: 'fill',
		source: 'berlin17',
		layout: {
			visibility: 'visible'
		},
		paint: {
			'fill-color': '#00ff00', // green color fill
	        'fill-opacity': 1.0
		},
	});

	map.addSource('berlin23', {
		type: 'geojson',
		data: 'berlin_2023.geojson'
	});
	map.addLayer({
		id: 'Berlin-2023',
		type: 'fill',
		source: 'berlin23',
		layout: {
			'visibility': 'visible'
		},
		paint: {
			'fill-color': '#ff0000', // red color fill
	        'fill-opacity': 1.0
		},
	});

	map.addSource('diff', {
		type: 'geojson',
		data: 'difference.geojson'
	});
	map.addLayer({
		id: 'Difference',
		type: 'fill',
		source: 'diff',
		layout: {
			'visibility': 'visible'
		},
		paint: {
			'fill-color': '#34e1d5', // cyan color fill
	        'fill-opacity': 1.0
		},
	});
});
 
// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
	// If these two layers were not added to the map, abort
	if (!map.getLayer('Berlin-2017') || !map.getLayer('Berlin-2023') || !map.getLayer('Difference')) {
	return;
}
 
// Enumerate ids of the layers.
const toggleableLayerIds = ['Berlin-2017', 'Berlin-2023','Difference'];
 
// Set up the corresponding toggle button for each layer.
for (const id of toggleableLayerIds) {
	// Skip layers that already have a button set up.
	if (document.getElementById(id)) {
	continue;
}
 
// Create a link.
const link = document.createElement('a');
link.id = id;
link.href = '#';
link.textContent = id;
link.className = 'active';
 
// Show or hide layer when the toggle is clicked.
link.onclick = function (e) {
	const clickedLayer = this.textContent;
	e.preventDefault();
	e.stopPropagation();
 
	const visibility = map.getLayoutProperty(
		clickedLayer,
		'visibility'
		);
 
	// Toggle layer visibility by changing the layout object's visibility property.
	if (visibility === 'visible') {
		map.setLayoutProperty(clickedLayer, 'visibility', 'none');
		this.className = '';
	} else {
		this.className = 'active';
		map.setLayoutProperty(
		clickedLayer,
		'visibility',
		'visible');
		}
	};
	 
	const layers = document.getElementById('menu');
		layers.appendChild(link);
	}
});
