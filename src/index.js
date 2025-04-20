'use strict';
import {showWetherData, notFound} from "./draw.js"
// let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Essen?unitGroup=metric&key=4EWEFLFY2S48BTA5NH8HK4VMF&contentType=json'; ЭТО ОБРАЗЕЦ
// let city = "Essen";
export let data = ''
export let config = {
    grad: 'metric'
}; //default metric. alternative unitGroup=us

export async function loadWetherData(city = "Essen" , grad = "metric") {
    console.log("loadWetherData city = "+city);
    console.log("loadWetherData grad = "+grad);
//    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${grad}&key=4EWEFLFY2S48BTA5NH8HK4VMF&contentType=json`; ЭТО ПЕРВЫЙ КЛЮЧА
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${grad}&key=PZVEXDS56S5URH33UA4N6EDZP&contentType=json`; // ЗАПАСНОЙ КЛЮЧ

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
            data = await response.json(); 
            console.log(data);
            showWetherData(data);
    } catch (error) {
        console.error('Ошибка:', error.message);
        notFound(city);
    }
}

// loadWetherData(city, grad);
loadWetherData();