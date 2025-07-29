import {API_KEY} from './config.js'

// Select reqired elemnts
let formSection=document.querySelector("#formSection");
let placeSearch=document.querySelector("#placeSearch");
let geoLocationBtn=document.querySelector("#geoLocationBtn");
let searchBtn=document.querySelector("#searchBtn");
let suggestionTile = document.querySelector('#suggestions-container');

// In the initial statge using both seapartly to test separate API endpoints
// let cityDataSection=document.querySelector("#cityDataSection");
// let forecastShowingBlock=document.querySelector("#forecastShowingBlock");

let AppendWholeData=document.querySelector("#AppendWholeData");

//localStorage.setItem('Places','[]');
const storeData=(place)=>{
  // Splicing array in such a way that latest search will be rendered
  // If search is same as in array not added but re ordered to latest
  let Places=[];
  let latestPlaceIndex=Places.length;
  // Getting all the stored data with key Places
  Places=JSON.parse(localStorage.getItem('Places')) || [];
  if(Places.includes(place)){
    latestPlaceIndex=Places.indexOf(place);
    Places.splice(latestPlaceIndex,1)
}else if(Places.length == 6){
  // Suggestion box at max have 6 suggetion rest will be erased
  Places.shift();
}
  Places.unshift(place);
//  Finally placing all the suggestions
  localStorage.setItem('Places',JSON.stringify(Places));
}

const renderAllData=(data,dataForecst,timeNow)=>{
// calculating the altitude of the place with this using pressure and sea level pressure
const ground = data["main"]["grnd_level"] ?? data.main.pressure;  // fallback to normal pressure if not available
const sea = data["main"]["sea_level"] ?? 1013;                     // default sea-level pressure ~1013 hPa if not available
const altitude = Math.round(44330 * (1 - (ground / sea) ** (1 / 5.255))); // formula for calcultaing altitude

// array of days to replace the day number with days
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// making sure data is not getting appedned multiple times
  AppendWholeData.innerHTML=``;

// added the place data by innerHTML
  AppendWholeData.innerHTML=` <section class="grid grid-cols-4 grid-rows-4 mt-6 mx-6 max-h-[50vh] h-[32vh] gap-[10px] sm:gap-[30px] w-[90vw] lg:w-[70vw] transition ease-in-out delay-500 duration-1500" id="cityDataSection">

<div class="col-start-1 col-end-2 row-start-1 row-end-3 h-[16vh] bg-blue-300 shadow-2xl rounded-md flex items-center flex-col justify-center hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
            <h3 class="font-bold text-sm sm:text-2xl lg:text-2xl text-center">${data["name"]}</h3>
            <p class="font-medium text-[10px] sm:text-xl text-gray-500">${data["sys"]["country"]}</p>
        </div>

        <div class="col-start-2 col-end-3 row-start-1 row-end-3 h-[16vh] bg-blue-300 shadow-2xl rounded-md flex items-center flex-col justify-center hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
            <p class="font-bold text-xl sm:text-3xl">${Math.round(Number(data["main"]["temp"]-273.15)*100)/100}<span class="font-semibold"> &#8451;</span></p>
            <p class="font-medium text-[10px] sm:text-base text-gray-700 hidden sm:block">Feels like <span>${Math.round(Number(data["main"]["feels_like"]-273.15)*100)/100}</span><span class="text-gray-500"> &#8451;</span></p>
        </div>

        <div class="col-start-1 col-end-5 row-start-3 row-end-5 flex flex-row h-[16vh] gap-[10px] sm:gap-[30px] w-[100%] justify-evenly">
            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] hidden items-center flex-col justify-center sm:flex hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">Time</h4>
                <p class="font-bold text-base sm:text-2xl">${timeNow}</p>
            </div>

            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] flex items-center flex-col justify-center hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">Humidity</h4>
                <p class="font-bold text-base sm:text-2xl">${data["main"]["humidity"]}<span class="text-gray-500"> %</span></p>
            </div>

            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] flex items-center flex-col justify-center hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">WindSpeed</h4>
                <p class="font-bold text-base sm:text-2xl">${data["wind"]["speed"]}<span class="text-gray-500"> m/s</span></p>
            </div>

            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] flex items-center flex-col justify-center hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">Altitude</h4>
                <p class="font-bold text-base sm:text-2xl">${altitude}<span class="text-gray-500"> meter</span></p>
            </div>
        </div>

        <div class="col-start-3 col-end-5 row-start-1 row-end-3 h-[16vh] bg-blue-300 shadow-2xl rounded-md flex items-center justify-evenly hover:scale-110 transition ease-in-out delay-200 duration-200 hover:bg-blue-200">
            <img src="https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png" alt="${data["weather"][0]["description"]} icon" class="h-20 w-20">
            <p class="font-medium text-base text-center sm:text-justify sm:text-xl text-gray-700">${data["weather"][0]["description"]}</p>
        </div>
    </section>
<!-- City data showing in a grud ends -->

</section>
`


// adding the forecst section here

// initialising the main container with classList and id
let forecastShowingBlock=document.createElement('section');
forecastShowingBlock.className = "mt-[30px] sm:mt-[35px] flex flex-col items-center bg-blue-300 shadow-2xl rounded-md h-[auto] lg:h-[35vh] w-[90vw] lg:w-[70vw] pb-[10px] transition ease-in-out delay-500 duration-1500";

forecastShowingBlock.setAttribute('id', 'forecastShowingBlock');
// basic str of forecast block
forecastShowingBlock.innerHTML=`<h3 class="my-3 text-2xl font-bold">5 Day Forecast</h3>`;

// new section separatly for 5 day forecast
let forecastAppend=document.createElement('section');
forecastAppend.className='flex sm:justify-evenly w-[100%] flex-wrap lg:flex-nowrap lg:overflow-hidden gap-[10px] flex-col sm:flex-row items-center';
forecastShowingBlock.appendChild(forecastAppend);

// usig for loop to append the forecasting day 5 times
for(let forecastDayIndex=0;forecastDayIndex<=4;forecastDayIndex++){
  // as we are using 5day/3hr API so
  // so 24/3=8 increment
  let forecastDay=(forecastDayIndex*8);
  let forecastDate = new Date(dataForecst.list[forecastDay].dt * 1000);
  // creating induvidal blocks
  let daysBlock=document.createElement('article');
  daysBlock.className = "bg-blue-50 shadow-2xl rounded-md p-2 sm:h-[24vh] lg:h-[24vh] sm:w-[25vw] lg:w-[13vw] w-[80vw] flex flex-col items-center justify-center";
  daysBlock.innerHTML=` <h4 class="text-[16px] font-bold">${days[forecastDate.getDay()]}</h4>
           <p class="text-[16px] lg:text-[14px] font-bold">${Math.round(dataForecst["list"][forecastDay]["main"]["temp"]-273.15)}<span> &#8451;</span></p>
            <img src="https://openweathermap.org/img/wn/${dataForecst["list"][forecastDay]["weather"][0]["icon"]}@2x.png" alt="${dataForecst["list"][forecastDay]["weather"][0]["description"]} icon" class="h-10 w-10 rounded-full bg-blue-400">
            <p class="text-[14px] lg:text-[12px] font-semibold text-gray-700">${dataForecst["list"][forecastDay]["weather"][0]["description"]}</p>
            <p class="text-[13px] lg:text-[12px] font-medium">Humidity <span>${dataForecst["list"][forecastDay]["main"]["humidity"]}</span><span> %</span></p>
            <p class="text-[13px] lg:text-[12px] font-medium">Windspeed <span>${dataForecst["list"][forecastDay]["wind"]["speed"]}</span><span> m/s</span></p>`
  forecastAppend.appendChild(daysBlock);
}
AppendWholeData.appendChild(forecastShowingBlock);
}

const getDataFromCityAPI=async (place)=>{
  // API link
    let API=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`;
    try{

      // fetch result from API
      let result=await fetch(API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      renderServerError();
      console.error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

// Function to get exact time of the city
const getTimeNowInCity=(data)=>{
  // fetch timezone in seconds to hours
  let timezone=Number(data["timezone"]);
  // fetch time
  let timeNow=Number(data["dt"]);

  // convert to local timestamp as timenow is from 1971
  let localTimeStamp=(timeNow+timezone)*1000;

  const localDateInPlace = new Date(localTimeStamp);

  // created a new datee with local time now getting a time
  const formattedTime = localDateInPlace.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });

 return formattedTime;
}

const getDataFromForecastAPI=async (place)=>{
  // API link
  let API=`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}`;
    try{

      // fetch result from API
      let result=await fetch(API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      // Throwing a error if some problem happends
      console.error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

// Function to render if user enters wrong city name
const renderSearchError=(searchPlace)=>{
  placeSearch.value=searchPlace;
  AppendWholeData.innerHTML=``;
  AppendWholeData.innerHTML=`<div class="h-[70vh] flex flex-col items-center justify-center w-[100%]">
<p>Oops there seems to be an error!</p>
<p>You have entered wrong city name</p>
  </div>`;
}

// Function to render if server error occours
const renderServerError=()=>{
  AppendWholeData.innerHTML=``;
  AppendWholeData.innerHTML=`<div class="h-[70vh] flex flex-col items-center justify-center w-[100%]">
  <p>Oops there seems to be an error!</p>
<p> Please check you connection as search timed out</p>
  </div>`;
}

// Function to render if iput is empty
const renderEmptySearch=()=>{
  AppendWholeData.innerHTML=``;
  AppendWholeData.innerHTML=`<div class="h-[70vh] flex flex-col items-center justify-center w-[100%]">
<p>
Please enter something before search!
</p>
</div>
`;
}

// Function to get searched city
const getSearchData= async (event)=>{
  let searchPlace=placeSearch.value;
  placeSearch.value='';
  // Calling the APIs
  let dataCity=await getDataFromCityAPI(searchPlace);
  let dataForecst=await getDataFromForecastAPI(searchPlace);

  // Making sure that errors get rendered perfeclty
  if(dataCity.cod=='404'){
    renderSearchError(searchPlace);
    return;
  }else if(dataCity.cod=="400"){
    renderEmptySearch();
    return;
  }
  //console.log(data)
  let timeNow=getTimeNowInCity(dataCity);
  renderAllData(dataCity,dataForecst,timeNow);
  //storing a search in local storage
   storeData(dataCity["name"]);
}

const getDataForecastByLatitude=async (data)=>{
  // this function is called when we use geolocation api
  let lat=data.latitude;
  let lon=data.longitude;
    // api link
  let API=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try{
      // fetch result from API
      let result=await fetch(API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      renderServerError();
      console.error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

const getDataByLatitude=async (data)=>{
   // this function is called when we use geolocation api
  let lat=data.latitude;
  let lon=data.longitude;
  let API=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try{
      // fetch result from API
      let result=await fetch(API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      renderServerError();
      console.error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

// function to get gps location
const getGeoData=async (event)=>{
  try {
    // Bundled inside a promise jsut for the safety and reliability of geolocation api
    const geoData = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // resolving with a latitude and longitude object
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => reject(`Geolocation is unable to fetch location data`,error)
      );
    });

   let dataCity=await getDataByLatitude(geoData);
   let dataForecast=await getDataForecastByLatitude(geoData);
   let timeNow=getTimeNowInCity(dataCity);
  renderAllData(dataCity,dataForecast,timeNow);
  storeData(dataCity["name"]);
  } catch (error) {
    console.error(error);
  }
};

searchBtn.addEventListener('click',getSearchData);
geoLocationBtn.addEventListener('click',getGeoData);

const getDataOfSuggestion=(e) => {
  // function gives/ updates the data with the clicked value
      let val=e.target.innerText;
      placeSearch.value = val;
      getSearchData();
       // need ti hide the dropdown after
      suggestionTile.classList.add('hidden'); 
    }

const renderSuggestion = (suggestions, targetVal) => {
  suggestionTile.innerHTML = '';

  // if suggestion is empty
  if (!suggestions || suggestions.length === 0){ 
    suggestionTile.classList.add('hidden');
    return;
  }

  // if the value is 0
  // 2 case first at starting second at clearing
  if(targetVal.length > 0){
     // Filter by input text (case-insensitive)

     // filtering based on seach
      let filtered = targetVal.length > 0 ? suggestions.filter(item => item.toLowerCase().includes(targetVal.toLowerCase())): suggestions;

  if (filtered.length === 0){
    return suggestionTile.classList.add('hidden');
  } 
  suggestionTile.classList.remove('hidden');

  // rendering filteed or [] or suggetion completly
  filtered.forEach(val => {
    const p = document.createElement('p');
    p.className = "hover:bg-blue-100 text-base text-justify p-2 rounded-md cursor-pointer w-[100%] border-grey-300 sahdow-md";
    p.textContent = val;

   // adding the event listner for every suggestion
    p.addEventListener('click', getDataOfSuggestion);

    suggestionTile.appendChild(p);
  });
  }
  else if(targetVal == ''){
    suggestionTile.classList.remove('hidden');
    suggestions.forEach(val => {
    const p = document.createElement('p');
    p.className = "hover:bg-blue-100 text-base text-justify p-2 rounded-md cursor-pointer w-[100%] border-grey-300 sahdow-md";
    p.textContent = val;

    // addending event listner
    p.addEventListener('click', getDataOfSuggestion);

    suggestionTile.appendChild(p);
  });
  return;
  }

};

// addeing the suggetion by parsing from local storage
const addSuggestion=(event)=>{
  let tragetVal=event.target.value;
  let suggestion=JSON.parse(localStorage.getItem('Places')) || [];
  // console.log(suggestion)

  renderSuggestion(suggestion,tragetVal);
}

// hides the suggestion on click to ohter parts other than search or suggestion box
const hideSuggestion=(event)=>{
  const suggestionTile = document.querySelector('#suggestions-container');
if (!event.target.closest('#suggestions-container') && !event.target.closest('#placeSearch')) {
    suggestionTile.classList.add('hidden');
}

}

placeSearch.addEventListener('input',addSuggestion);
document.body.addEventListener('click',hideSuggestion);
// placeSearch.addEventListener('focus', addSuggestion);

// renders the lates search every time so the the dashboard is not empty
const renderLatest=async ()=>{

  let suggestion=JSON.parse(localStorage.getItem('Places')) || [];

  if (suggestion.length === 0){
getGeoData();
return;
  } 

    let searchPlace=suggestion[0];
  placeSearch.value='';
  let dataCity=await getDataFromCityAPI(searchPlace);
  let dataForecst=await getDataFromForecastAPI(searchPlace);

  //console.log(data)
  let timeNow=getTimeNowInCity(dataCity);
  renderAllData(dataCity,dataForecst,timeNow);
   storeData(dataCity["name"]);
  
}
renderLatest();