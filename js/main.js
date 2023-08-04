let btnSearch = document.querySelector(".btn");
let searchBox = document.querySelector(".search input");
let rowBody = document.querySelector("#rowBody");

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

searchBox.addEventListener("keyup", function (e) {
  rowBody.innerHTML = "";
  if (e.target.value == "") {
    getData("Cairo");
  } else {
    getData(e.target.value);
  }
});

function getData(country) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=69542678953342a486381800230108&q=${country}&days=3`
  );
  xmlhttp.send();

  xmlhttp.addEventListener("readystatechange", function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const response = JSON.parse(xmlhttp.response);
      currentDay(response.current, response.location);
      nextDays(response.forecast);
    }
  });
}

function currentDay(current, location) {
  rowBody.innerHTML = `
  <div class="col-md-4">
  <div class="dayOne text-white bg-card ">
  <h6 class="head bg-head  p-2 mb-2 d-flex justify-content-between text-info">
  <span>${dayNames[new Date().getDay(location.localtime)]}
  </span>
  <span>
  ${new Date().getDate(location.localtime)} 
  ${monthNames[new Date().getMonth(location.localtime)]}
  </span>
  </h6>
       <h3 class="city text-start fs-5 p-4">${location.name} , ${
    location.region
  }</h3>

       <div class="weather-details d-flex justify-content-around align-items-center">
          <h1 class="temp ">${current.temp_c + "C"}  </h1>
          <img src="${current.condition.icon}" class="weather-icon">
       </div>
       <div class="weather-case text-start p-4 text-info">${
         current.condition.text
       }</div>

       <div class="details d-flex">
        <div class="col ">
          <img src="iamge/icon-umberella.png" class="presentagImg" alt="">
          <p class="humidity mt-2">${current.humidity} %</p>
        </div>
        <div class="col">
          <img src="iamge/icon-wind.png" alt="">
          <p class="wind mt-2">${current.wind_kph}  Km/h</p>
        </div>
        <div class="col">
          <img src="iamge/icon-compass.png" alt="">
          <p class="WindDirection mt-2">${current.wind_dir}</p>
        </div>
       </div>
  </div>
</div>
  `;
}

function nextDays(next) {
  for (let i = 0; i < 2; i++) {
    rowBody.innerHTML += `
  <div class="col-md-4">
  <div class=" text-white bg-card ">
  <h6 class="head bg-head  p-2 mb-2 text-center text-info">
  <span>${ dayNames[new Date(next.forecastday[i].date).getDay()]}
  </span>
  </h6>
      

       <div class="weather-details  text-center">
       <div class=" m-5 ">
                        <div>
                            <p class="card-text fs-4 fw-bold">${
                              next.forecastday[i].day.maxtemp_c
                            }<sup>o</sup>C</p>
                            <p>${
                              next.forecastday[i].day.mintemp_c
                            }<sup>o</sup></p>
                        </div>
                        <img src="${
                          next.forecastday[i].day.condition.icon
                        }" alt="" width="70">
                    </div>
                    <p class="state text-info mt-4 pb-3" >${
                      next.forecastday[i].day.condition.text
                    }</p>
                </div>
  </div>
</div>
  `;
  }
}

getData("Cairo");
