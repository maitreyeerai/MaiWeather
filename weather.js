//Background change acc. to time of the day
const backg = document.body;
let currentTime = new Date().getHours();
if( 5 <= currentTime && currentTime < 12){
    backg.classList.add('morning');
}
else if(12 <= currentTime && currentTime < 16){
    backg.classList.add('day');
}
else if( 16 <= currentTime && currentTime < 20){
    backg.classList.add('evening');
}
else backg.classList.add('night');

//Background change by button
document.querySelector('.morning-button').addEventListener('click',function(){backg.classList.remove(backg.className)});
document.querySelector('.morning-button').addEventListener('click',function (){backg.classList.add('morning')});

document.querySelector('.day-button').addEventListener('click',function(){backg.classList.remove(backg.className)});
document.querySelector('.day-button').addEventListener('click',function (){backg.classList.add('day')});

document.querySelector('.evening-button').addEventListener('click',function(){backg.classList.remove(backg.className)});
document.querySelector('.evening-button').addEventListener('click',function (){backg.classList.add('evening')});

document.querySelector('.night-button').addEventListener('click',function(){backg.classList.remove(backg.className)});
document.querySelector('.night-button').addEventListener('click',function (){backg.classList.add('night')});

//Fetching and displaying weather
let weather = {
    fetchWeather: function(city){
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&APPID=1cb873f27e3ae4fe5c42f51d6c07deab')
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));

    },
    displayWeather: function(data){
        const {name} = data;
        const {temp, humidity} = data.main;
        const {icon, description} = data.weather[0];
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humdity: " + humidity + "%";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = "Speed: " + speed + "km/hr";
        document.querySelector(".weather").classList.remove("loading");
    }
};

const search = document.querySelector(".search-bar");
document.querySelector(".search button").addEventListener("click", function(){
    weather.fetchWeather(search.value);
});

search.addEventListener("keyup", function(e){
    if(e.key === "Enter") weather.fetchWeather(search.value);
});

weather.fetchWeather("Delhi");
