const api = {
  key: "f4b1b1cb81a17f14da5076d4094545cd",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric"
}

const searchbox = document.querySelector('.search-box');
const button = document.querySelector('.btn');
const city = document.querySelector('.location .city');
const date = document.querySelector('.location .date');
const temp = document.querySelector('.temp');
const temp_span = document.querySelector('span');
const weather_el = document.querySelector('.current .weather');
const low_high = document.querySelector('.low-high');

/*se pressionar enter envia o valor do input para a funcao request*/
searchbox.addEventListener('keypress', setQuery);
function setQuery(event) {
  let key = event.keyCode;
  if (key == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}
/*se clicou no botao de pesquisa envia o valor do input para a funcao request*/
button.addEventListener('click', function(){
  getResults(searchbox.value);
})

/*request na url | funcao weather retorna os valores em json*/
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {
      return response.json();
    }).then(displayResults);
//.catch(err => alert("cidade nao encontrada"))
}

function displayResults (weather) {
  console.log(weather)

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  let temperature = `${Math.round(weather.main.temp)}`
  temp.innerHTML = temperature;
  temp_span.innerHTML = `°c`;
  // changeTemp(temperature)

  // weather_el.innerText = weather.weather[0].main;
  weather_el.innerText = weather.weather[0].description;

  low_high.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


temp.addEventListener('click', changeTemp);
function changeTemp() {
  // let celsius1 = parseInt(celsius)
  tempNumber = temp.textContent

  if(temp_span.textContent === "°c"){
    let fahrenheit = (9 * tempNumber + 160) / 5;
    temp_span.textContent = "°f";
    temp.innerHTML  = `${Math.round(fahrenheit)}`;
  }
  else{
    let celsius = (tempNumber - 32) / 1.8;
    temp_span.textContent = "°c";
    temp.innerHTML  = `${Math.round(celsius)}`;
  }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate(); //getDate: day 1-30
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}