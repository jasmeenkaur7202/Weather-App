const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
  const time = new Date();   //Date class in the browser(provide next date)
  const month = time.getMonth(); 
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour; // to display time in 12 hr format
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>` //updated time element
  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]; //updated date element 
}, 1000);


let weather = {
    apiKey: "105dab5f56560a6f3f0307cd41875960",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },


    displayWeather: function (data) { // display the weather details in the entered city
      const { lon, lat} = data.coord;
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, pressure, humidity } = data.main;
      const { speed } = data.wind;

      document.querySelector(".longitude").innerText = "Longitude: " + lon;
      document.querySelector(".latitude").innerText = "Latitude: " + lat;
      document.querySelector(".city ").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + " °C";
      document.querySelector(".pressure").innerText = "Pressure: " + pressure + " mbar";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    //   document.body.style.backgroundImage =
    //     "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Delhi");  // default weather will be shown of Delhi