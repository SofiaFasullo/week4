import stops from '../data/stops.js';
import { initializeStopMap, showStopsOnMap } from './stops-map.js';
import { showStopsInList } from './stops-list.js';

let stopMap = initializeStopMap();
showStopsOnMap(stops, stopMap);

let stopList = document.querySelector('#stop-list');
showStopsInList(stops, stopList);

let routeCheckboxes = document.querySelectorAll('.route-checkbox');
let stopNameInput = document.querySelector('#stop-name-input')

function getFilteredStops() {  //get all the filters so you can apply multiple filters over e/other
  const text = stopNameInput.value;

  // Filter based on route name
  let filteredStops = stops.filter(function (stop) {
    const name = stop['stop_name'].toLowerCase();
    const hasText = name.includes(text);
    return hasText;
});
// Filter based on route checkboxes
for (const checkbox of routeCheckboxes) {
  if (checkbox.checked) {
    filteredStops = filteredStops.filter(function (stop) {
      const route = checkbox.value;
      const hasRoute = stop['routes_ids'].includes(route);
      return hasRoute
    })
  }
}

return filteredStops;
}

for (const cb of routeCheckboxes) {
  cb.addEventListener('change', (evt) => {
    const filteredStops = getFilteredStops()
    showStopsOnMap(filteredStops, stopMap);
  })
    
}

stopNameInput.addEventListener('input',() => {
  const filteredStops = getFilteredStops();
  showStopsOnMap(filteredStops,stopMap)
});

window.stops = stops;
window.stopMap = stopMap;
window.routeCheckboxes = routeCheckboxes;