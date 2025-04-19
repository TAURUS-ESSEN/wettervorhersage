'use strict';
// import {loadWetherData, url} from "./index.js"

const container = document.querySelector("wrapper");
const button = document.querySelector("button")

// button.addEventListener("click", loadWetherData(button.value))

export function showWetherData(data) {
    document.getElementById("location").textContent = data.resolvedAddress;
    document.getElementById("temp").textContent = Math.round(data.days[0].temp);
    document.getElementById("temp-min").textContent = Math.round(data.days[0].tempmin);
    document.getElementById("temp-max").textContent = Math.round(data.days[0].tempmax);
    
    // console.log(data.address);
    // console.log(data.resolvedAddress);
    // console.log(data.days[0].temp);
    // console.log(data.days[0].conditions);
    // console.log(data.days[0].tempmax);
    // console.log(data.days[0].tempmin);
    // console.log(data.days[0].feelslike);
    // console.log(data.days[0].humidity);
    // console.log(data.days[0].windspeed);
    // console.log(data.days[0].pressure);
    for (let i=0; i<=5; i++) {
        console.log(data.days[i].datetime, data.days[i].tempmin, data.days[i].tempmax);
    }
}