let API_KEY=`b874179f1b2c1ec026bff4eb0777ce2b`;

// Select reqired elemnts
let formSection=document.querySelector("#formSection");
let placeSearch=document.querySelector("#placeSearch");
let geoLocationBtn=document.querySelector("#geoLocationBtn");
let searchBtn=document.querySelector("#searchBtn");

// In the initial statge using both seapartly to test separate API endpoints
// let cityDataSection=document.querySelector("#cityDataSection");
// let forecastShowingBlock=document.querySelector("#forecastShowingBlock");

// Use below this to render once to reduce reflow and repaint
let AppendWholeData=document.querySelector("#AppendWholeData");

//localStorage.setItem('Places','[]');
const storeData=(place)=>{

  // Splicing array in such a way that latest search will be rendered
  // If search is same as in array not added but re ordered to latest
  let Places=[];
  let latestPlaceIndex=Places.length;
  Places=JSON.parse(localStorage.getItem('Places')) || [];
  if(Places.includes(place)){
    latestPlaceIndex=Places.indexOf(place);
    Places.splice(latestPlaceIndex,1)
}else if(Places.length == 6){
  Places.shift();
}
  Places.push(place);

  localStorage.setItem('Places',JSON.stringify(Places));
}


const renderAllData=(data,dataForecst,timeNow)=>{
  let todayDate=new Date();
let today=todayDate.getDay();
const ground = data["main"]["grnd_level"] ?? data.main.pressure;  // fallback to normal pressure if not available
const sea = data["main"]["sea_level"] ?? 1013;                     // default sea-level pressure ~1013 hPa if not available
const altitude = Math.round(44330 * (1 - (ground / sea) ** (1 / 5.255)));

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  AppendWholeData.innerHTML=``;
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

let forecastShowingBlock=document.createElement('section');
forecastShowingBlock.className = "mt-[30px] sm:mt-[35px] flex flex-col items-center bg-blue-300 shadow-2xl rounded-md h-[auto] lg:h-[35vh] w-[90vw] lg:w-[70vw] pb-[10px] transition ease-in-out delay-500 duration-1500";

forecastShowingBlock.setAttribute('id', 'forecastShowingBlock');
forecastShowingBlock.innerHTML=`<h3 class="my-3 text-2xl font-bold">5 Day Forecast</h3>`;

let forecastAppend=document.createElement('section');
forecastAppend.className='flex sm:justify-evenly w-[100%] flex-wrap lg:flex-nowrap lg:overflow-hidden gap-[10px] flex-col sm:flex-row items-center';
forecastShowingBlock.appendChild(forecastAppend);

for(let forecastDayIndex=0;forecastDayIndex<=4;forecastDayIndex++){
  let forecastDay=forecastDayIndex*8;
  let daysBlock=document.createElement('article');
  daysBlock.className = "bg-blue-50 shadow-2xl rounded-md p-2 sm:h-[24vh] lg:h-[24vh] sm:w-[25vw] lg:w-[13vw] w-[80vw] flex flex-col items-center justify-center";
  daysBlock.innerHTML=` <h4 class="text-[16px] font-bold">${days[(today+forecastDay+1)%7]}</h4>
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
    let API=`api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`;
    try{

      // fetch result from API
      let result=await fetch('https://'+API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      throw new Error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

// Function to get exact time of the city
const getTimeNowInCity=(data)=>{
  // fetch timezone in seconds to hours
  let timezone=Number(data["timezone"]);
  
  let timeNow=Number(data["dt"]);

  let localTimeStamp=(timeNow+timezone)*1000;

  const localDateInKoppa = new Date(localTimeStamp);

  const formattedTime = localDateInKoppa.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });

 return formattedTime;
}

const getDataFromForecastAPI=async (place)=>{
  let API=`api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}`;
    try{

      // fetch result from API
      let result=await fetch('https://'+API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      throw new Error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

const renderSearchError=(searchPlace)=>{
  placeSearch.value=searchPlace;
  AppendWholeData.innerHTML=``;
  AppendWholeData.innerHTML=`<div class="h-[70vh] flex items-center justify-center w-[100%]"><p>Oops there seems to be an error!</p>
  <p>You have entered wrong city name</p>
  </div>`;
}

const renderEmptySearch=()=>{
  AppendWholeData.innerHTML=``;
  AppendWholeData.innerHTML=`<div class="h-[70vh] flex items-center justify-center w-[100%]"><p>Please enter something before search!</p>
  </div>`;
}

// Function to get searched city
const getSearchData= async (event)=>{
  let searchPlace=placeSearch.value;
  placeSearch.value='';
  let dataCity=await getDataFromCityAPI(searchPlace);
  let dataForecst=await getDataFromForecastAPI(searchPlace);

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
   storeData(dataCity["name"]);
}

const getDataForecastByLatitude=async (data)=>{
  let lat=data.latitude;
  let lon=data.longitude;
  let API=`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try{
      // fetch result from API
      let result=await fetch('https://'+API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      throw new Error(`Error: This is a server side error
Failed to fetch data.`);
    }
}

const getDataByLatitude=async (data)=>{
  let lat=data.latitude;
  let lon=data.longitude;
  let API=`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try{
      // fetch result from API
      let result=await fetch('https://'+API);
      let data=await result.json();

      // pass data to render
      return data;

      // console.log(data);
    }catch(err){
      throw new Error(`Error: This is a server side error
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
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => reject(error)
      );
    });

   let dataCity=await getDataByLatitude(geoData);
   let dataForecast=await getDataForecastByLatitude(geoData);
   let timeNow=getTimeNowInCity(dataCity);
  renderAllData(dataCity,dataForecast,timeNow);
  storeData(dataCity["name"]);
  } catch (error) {
    console.log("Oops", error);
  }
};

searchBtn.addEventListener('click',getSearchData);
geoLocationBtn.addEventListener('click',getGeoData);

// const renderSuggestion=(suggestion)=>{
//   let sugestionTile=document.querySelector('#valData');
// sugestionTile.innerHTML='';
//   for(let val of suggestion){
//     let valDtat=document.createElement('p');
//     valDtat.innerHTML=`<p class="hover:bg-blue-50 font-bold text-xl text-justify p-2 rounded-md">${val}</p>`;
//     sugestionTile.appendChild(valDtat);
//   }
// }

// const addSuggestion=()=>{
//   let suggestion=JSON.parse(localStorage.getItem('Places'));
//   console.log(suggestion)

//   renderSuggestion(suggestion);
// }

//placeSearch.addEventListener('input',addSuggestion);
const renderLatest=async ()=>{
  let suggestion=JSON.parse(localStorage.getItem('Places'));

    let searchPlace=suggestion[suggestion.length-1];
  placeSearch.value='';
  let dataCity=await getDataFromCityAPI(searchPlace);
  let dataForecst=await getDataFromForecastAPI(searchPlace);

  //console.log(data)
  let timeNow=getTimeNowInCity(dataCity);
  renderAllData(dataCity,dataForecst,timeNow);
   storeData(dataCity["name"]);
  
}
renderLatest();