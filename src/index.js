'use strict';
import {showWetherData} from "./draw.js"
let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Essen?unitGroup=metric&key=4EWEFLFY2S48BTA5NH8HK4VMF&contentType=json';
export let data = ' '
async function loadWetherData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
            data = await response.json(); 
            console.log(data);
            showWetherData(data);
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

loadWetherData();