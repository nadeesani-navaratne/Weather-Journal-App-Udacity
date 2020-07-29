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
    //new syntax
    getWeatherRequest(baseURL, newZipCode, apiKey)
        .then(function (data) {
            postData('/addData', { temp: data.main.temp, name: data.name, feelings: newFeeling, date: newDate, icon: data.weather[0].icon })
            updateUI()
            updateHistoryUI()
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
        return newData
    } catch (error) {
        console.log("error", error);
    }
}
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        const lastItem = allData.postData[allData.postData.length - 1];
        const temperature = lastItem.temp;
        const currentIcon = lastItem.icon;
        document.getElementById('temp').innerHTML = `${temperature}°F`;
        document.getElementById('date').innerHTML = lastItem.date;
        document.getElementById("weather__icon").src = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
        document.getElementById('content').innerText = `${lastItem.name},US`;
        document.getElementById('feeling').innerHTML = `Your feelings now - ${lastItem.feelings}`;
    } catch (error) {
        console.log("error", error);
    }
}

const updateHistoryUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        const historyItems = allData.postData.pop();
        if (allData.postData.length < 2) {
            document.getElementById('historyHolder').innerHTML = `No Search History to display`;
        } else {
            for (let i = 0; i < 5; i++) {
                console.log(allData.postData[i].name);
                const letterResult = document.getElementById('historyList');
                letterResult.innerHTML += "<li>" + allData.postData[i].date + allData.postData[i].name + allData.postData[i].temp + allData.postData[i].feelings + "</li>";
            }
        }
    }
    catch (error) {
        console.log("error", error);
    }
}

