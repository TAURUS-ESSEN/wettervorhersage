'use strict';
import {showWetherData, showCircle, hideCircle, notFound} from "./draw.js"
export let data = ''
export let config = {
    grad: 'metric'
};

export async function loadWetherData(city = "Essen" , grad = "metric") {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${grad}&key=4EWEFLFY2S48BTA5NH8HK4VMF&contentType=json`; // ЭТО ПЕРВЫЙ КЛЮЧА

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            data = await response.json(); 
            console.log(data);   
            showCircle();
            setTimeout(() => {
                hideCircle();
                showWetherData(data);
            }, 2000);
    } catch (error) {
        console.error('Error:', error.message);
        notFound(city);
    }
}

loadWetherData();
