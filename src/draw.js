'use strict';
import {config, data, loadWetherData} from "./index.js"

const btnSearch = document.getElementById("search");
const btnGradToggler = document.getElementById("gradToggler");
const input = document.querySelector("input");
const showError = document.getElementById("error-block");
const circles = document.querySelector(".sk-circle");
const weatherBlock = document.querySelector(".wether-today");
const container = document.querySelector(".wether-5days");

const iconMap = {
    'clear-day': '☀',
    'clear-night': '🌙',
    'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '🌥',
    'cloudy': '☁',
    'rain': '🌧',
    'snow': '❄',
    'sleet': '🌨',
};

const whetherMap = {
    'Clear': 'clear-icon.png',
    'Partially cloudy': 'cloudy-icon.png',
    'Overcast': 'overcast-icon.png',
    'Rain': 'rain-icon.png',
    'Snow': 'snow-icon.png'
};

const whetherBackgroundMap = {
    'Clear': 'clear-bg.jpg',
    'Partially cloudy': 'cloudy-bg.jpg',
    'Overcast': 'overcast-bg.jpg',
    'Rain': 'rain-bg.jpg',
    'Snow': 'snow-bg.jpg'
};

btnSearch.addEventListener("click", () => {
    if (input.value !== '') {
        showError.style.display = "none";
        loadWetherData(input.value, config.grad);
    }
})

btnGradToggler.addEventListener("click", () => {
    btnGradToggler.textContent = (btnGradToggler.textContent === '°F') ? '°C' : '°F';
    config.grad = (config.grad === 'metric') ? 'us' : 'metric';
    loadWetherData(data.address, config.grad )
})

export function showWetherData(data) {
    input.value = '';
    let weatherIcon = data.days[0].conditions;

    const index = weatherIcon.indexOf(',');
    if (index !== -1 ) {
    weatherIcon = weatherIcon.slice(0,index);
    }  
    const weatherBg = whetherBackgroundMap[weatherIcon] || 'clear-bg.jpg';
    
    document.body.style.backgroundImage = `url('./img/${weatherBg}')`;
    const weatherSymbol = whetherMap[weatherIcon] || 'clear-icon.png';
    document.getElementById("location").textContent = data.resolvedAddress;
    document.getElementById("weather-icon").src = `./img/${weatherSymbol}`;
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
                        <div class="minmax"> <span>${Math.round(data.days[i].tempmax)}</span>&deg;/ 
                        <span>${Math.round(data.days[i].tempmin)}</span>&deg;</div>
                    </div>
                </div>`
    }
}

export function notFound(value) {
    showError.style.display = "block";
    showError.textContent = `Your location ${value} not found.`
}

export function showCircle() {
    circles.classList.remove("wether-hidden");
    weatherBlock.classList.add("wether-hidden");
}

export function hideCircle() { 
    circles.classList.add("wether-hidden");
    weatherBlock.classList.remove("wether-hidden");
}