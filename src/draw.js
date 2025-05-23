'use strict';
import {config, data, loadWeatherData} from "./index.js"

import clearIcon from './img/clear-icon.png';
import cloudyIcon from './img/cloudy-icon.png';
import overcastIcon from './img/overcast-icon.png';
import rainIcon from './img/rain-icon.png';
import snowIcon from './img/snow-icon.png';

import clearBg from './img/clear-bg.jpg';
import cloudyBg from './img/cloudy-bg.jpg';
import overcastBg from './img/overcast-bg.jpg';
import rainBg from './img/rain-bg.jpg';
import snowBg from './img/snow-bg.jpg';

const btnSearch = document.getElementById("search");
const btnGradToggler = document.getElementById("gradToggler");
const input = document.querySelector("input");
const showError = document.getElementById("error-block");
const circles = document.querySelector(".sk-circle");
const weatherBlock = document.querySelector(".weather-today");
const container = document.querySelector(".weather-5days");

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

const weatherMap = {
    'Clear': clearIcon,
    'Partially cloudy': cloudyIcon,
    'Overcast': overcastIcon,
    'Rain': rainIcon,
    'Snow': snowIcon,
  };
  
  const weatherBackgroundMap = {
    'Clear': clearBg,
    'Partially cloudy': cloudyBg,
    'Overcast': overcastBg,
    'Rain': rainBg,
    'Snow': snowBg,
  };

btnSearch.addEventListener("click", () => {
    if (input.value.trim() !== '') {
        showError.style.display = "none";
        loadWeatherData(input.value, config.grad);
    }
})

input.addEventListener('keydown', event => {
    if ((event.key === 'Enter') && (input.value.trim() !== '')) { 
        loadWeatherData(input.value, config.grad);
    } 
})

btnGradToggler.addEventListener("click", () => {
    btnGradToggler.textContent = (btnGradToggler.textContent === '°F') ? '°C' : '°F';
    config.grad = (config.grad === 'metric') ? 'us' : 'metric';
    loadWeatherData(data.address, config.grad )
})

export function showWeatherData(data) {
    input.value = '';
    let weatherIcon = data.days[0].conditions;

    const index = weatherIcon.indexOf(',');
    if (index !== -1 ) {
    weatherIcon = weatherIcon.slice(0,index);
    }  
    const weatherBg = weatherBackgroundMap[weatherIcon] || 'clear-bg.jpg';
    
    document.body.style.backgroundImage = `url('${weatherBg}')`;
    const weatherSymbol = weatherMap[weatherIcon] || 'clear-icon.png';
    document.getElementById("location").textContent = data.resolvedAddress;
    document.getElementById("weather-icon").src = `${weatherSymbol}`;
    document.getElementById("temp").textContent = Math.round(data.days[0].temp);
    document.getElementById("temp-min").textContent = Math.round(data.days[0].tempmin);
    document.getElementById("temp-max").textContent = Math.round(data.days[0].tempmax);
    container.innerHTML = '';
    for (let i=1; i<6; i++) {
        let day = data.days[i].datetime.slice(-2) + '.' + data.days[i].datetime.slice(5,7)
        const icon = data.days[i].icon;
        const iconSymbol = iconMap[icon] || '❓';
        container.innerHTML += `
                <div class="weather-5days-day">
                    <div class="weather-5days-left"> 
                        <div class="ico">${iconSymbol}</div>
                        <div class="day">  ${day} </div>
                        <div class="wetter">${data.days[i].conditions}</div>
                    </div>
                    <div class="weather-5days-right">
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
    circles.classList.remove("weather-hidden");
    weatherBlock.classList.add("weather-hidden");
}

export function hideCircle() { 
    circles.classList.add("weather-hidden");
    weatherBlock.classList.remove("weather-hidden");
}