'use strict';
import { loadWetherData } from "./index.js"

const container = document.querySelector(".wether-5days");
const button = document.querySelector("button");
const input = document.querySelector("input");
const showError = document.getElementById("error-block");

const iconMap = {
    'clear-day': '☀',
    'clear-night': '🌙',
    'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '🌥',
    'cloudy': '☁',
    'rain': '🌧',
    'snow': '❄',
    'sleet': '🌨',
    'wind': '💨',
    'fog': '🌫'
  };

button.addEventListener("click", () => {
    showError.style.display = "none";
    loadWetherData(input.value);
})

export function showWetherData(data) {
    console.log("ss");
    document.getElementById("location").textContent = data.resolvedAddress;
    document.getElementById("temp").textContent = Math.round(data.days[0].temp);
    document.getElementById("temp-min").textContent = Math.round(data.days[0].tempmin);
    document.getElementById("temp-max").textContent = Math.round(data.days[0].tempmax);
    container.innerHTML = '';
    for (let i=1; i<6; i++) {
        let day = data.days[i].datetime.slice(-2) + '.' + data.days[i].datetime.slice(5,7)
        const icon = data.days[i].icon;
        const iconSymbol = iconMap[icon] || '❓';
        container.innerHTML += `
                <div class="test">
                    <div class="wether-5days-left"> 
                        <div class="ico">${iconSymbol}</div>
                        <div class="day">  ${day} </div>
                        <div class="wetter">${data.days[i].conditions}</div>
                    </div>
                    <div class="wether-5days-right">
                        <div class="minmax"> <span>${Math.round(data.days[i].tempmin)}</span>&deg; / <span>${Math.round(data.days[i].tempmax)}</span>&deg; </div>
                    </div>
                </div>`
    }
}

export function notFound(value) {
    showError.style.display = "block";
    showError.textContent = `You location ${value} not found. Enjoi wether in Essen :D`
    loadWetherData();
}