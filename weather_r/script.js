const api = {
    key: "f4b1b1cb81a17f14da5076d4094545cd",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
  }
  
  
  const city = document.querySelector('.container-location .city');
  const date = document.querySelector('.container-location .date');
  const container_icon = document.querySelector('.container-icon');
  const degree_section = document.querySelector('.container-temp');
  const temp = document.querySelector('.container-temp div');
  const temp_span = document.querySelector('.container-temp span');
  const weather_el = document.querySelector('.weather');
  const low_high = document.querySelector('.low-high');
  const searchbox = document.querySelector('.searchTerm');
  const button = document.querySelector('.searchButton');

  /*GEOLOCAZALICAO*/
  window.addEventListener('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
      alert('navegador nao suporta geolozalicação');
    }
    function setPosition(position) {
      console.log(position)
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      getcoordResults(lat, long);
    }
    function showError(error) {
      alert(`erro: ${error.message}`);
    }
  })
  
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position)
  //   })
  
  
  function getcoordResults(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
      .then(response => {
        return response.json();
      }).then(displayResults);
    //.catch(err => alert("cidade nao encontrada"))
  }
  /*//GEOLOCAZALICAO*/
  
  /*PESQUISA*/
  /*enter no input*/
  searchbox.addEventListener('keypress', setQuery);
  function setQuery(event) {
    let key = event.keyCode;
    if (key == 13) {
      getResults(searchbox.value);
      console.log(searchbox.value);
    }
  }
  /*button no input*/
  button.addEventListener('click', function () {
    getResults(searchbox.value);
  })
  
  /*request na url | funcao weather retorna os valores em json*/
  function getResults(query) {
    fetch(`${api.base}weather?q=${query}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
      .then(response => {
        return response.json();
      }).then(displayResults);
    //.catch(err => alert("cidade nao encontrada"))
  }
  /*// PESQUISA*/
  
  function displayResults(weather) {
    console.log(weather)
  
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    date.innerText = dateBuilder(now);
  
    let iconName = weather.weather[0].icon;
    container_icon.innerHTML = `<img src="./icons/${iconName}.png">`;
  
    let temperature = `${Math.round(weather.main.temp)}`
    temp.innerHTML = temperature;
    temp_span.innerHTML = `°c`;
    // changeTemp(temperature)
  
    weather_el.innerText = weather.weather[0].description;
    // weather_el.innerText = weather.weather[0].main;
  
    low_high.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  
  degree_section.addEventListener('click', changeTemp);
  function changeTemp() {
    // let celsius1 = parseInt(celsius)
    tempNumber = temp.textContent
  
    if (temp_span.textContent === "°c") {
      let fahrenheit = (9 * tempNumber + 160) / 5;
      temp_span.textContent = "°f";
      temp.innerHTML = `${Math.round(fahrenheit)}`;
    }
    else {
      let celsius = (tempNumber - 32) / 1.8;
      temp_span.textContent = "°c";
      temp.innerHTML = `${Math.round(celsius)}`;
    }
  }
  
  function dateBuilder(d) {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  
    let day = days[d.getDay()]; //getDay: 0-6
    let date = d.getDate(); //getDate: day 1-30
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }