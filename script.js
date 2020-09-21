const api = {
    key: "4302ada1635884a2835aa9d49f414d75",
    base: "http://api.openweathermap.org/data/2.5/",
}

const input = document.querySelector("input");
input.addEventListener('keypress', handleKey);

function handleKey(e) {
    let main = document.querySelector('main');
    if (e.keyCode == 13) {
        queryData(input.value)
        if (main.classList != "active")
            main.className += "active";
    }
}

function queryData(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>&#176;C<span/>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}&#176;C / ${Math.round(weather.main.temp_max)}&#176;C`;
}

function dateBuilder(d) {
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();
   return `${day} ${date} ${month} ${year}`;
}