/* Global Variables */
const apiKey = 'f86e425f20afd7ad35d40852dc3d5d82';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

/*
Adding event listner for generate button.
Once generate button clicked will send an api call to fetch data from the OpenWeatherMap API.
*/


const generateButton = document.getElementById('generate');
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

generateButton.addEventListener('click', performAction);
function performAction() {
    const newZipCode = zip.value;
    const newFeeling = feelings.value;
    console.log('Dattttaaaaaaaaaaaaaaaaaa');
    console.log(newZipCode, newFeeling);
    //new syntax
    getWeatherRequest(baseURL, newZipCode, apiKey)
        .then(function (data) {
            console.log(data)
            console.log('tttttttttttttttttttttttttttt');
            console.log(data.main.temp);
            console.log(data.weather[0].icon)
            console.log(data.main.temp, data.name, newFeeling, newDate, data.weather[0].icon)
            postData('/addData', { temp: data.main.temp, name: data.name, feelings: newFeeling, date: newDate, icon: data.weather[0].icon })

        })
};


// Fetching data from Web API and returning data 

const getWeatherRequest = async (baseURL, newZipCode, apiKey) => {
    const urlToFetch = `${baseURL}zip=${newZipCode}&units=imperial&appid=${apiKey}`;
    const request = await fetch(urlToFetch);
    try {
        // Transform into JSON
        const data = await request.json();
        return (data);
    }
    catch (error) {
        console.log("error", error);
    }
}

// Example POST method implementation:
const postData = async (url = '/addData', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    try {
        const newData = await response.json();
        console.log('ffffffffffffffffffffffffffffffffffffffffffffnewdata');
        console.log(newData);
        return newData
    } catch (error) {
        console.log("error", error);
    }
}



