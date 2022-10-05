import { htmlToElement } from './template-tools.js'

function showStopsInList(stopsToShow, stopList) {
    stopList.innerHtml = '' //much easier to clear using html than JS

    for (const stop of stopsToShow) {
        const html = `
        <li class="stop-list-item">${stop['stop_name']}</li>}`;
        const li = htmlToElement(html);
        stopList.append(li);
    }
}

export {
    showStopsInList,
};