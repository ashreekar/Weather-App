let API_KEY=`b874179f1b2c1ec026bff4eb0777ce2b`;

// Select reqired elemnts
let formSection=document.querySelector("#formSection");
let placeSearch=document.querySelector("#placeSearch");
let geoLocationBtn=document.querySelector("#geoLocationBtn");
let searchBtn=document.querySelector("#searchBtn");

// In the initial statge using both seapartly to test separate API endpoints
let cityDataSection=document.querySelector("#cityDataSection");
let forecastShowingBlock=document.querySelector("#forecastShowingBlock");

// Use below this to render once to reduce reflow and repaint
let AppendWholeData=document.querySelector("#AppendWholeData");

const renderCityAPIData=(data,timeNow)=>{

  cityDataSection.innerHTML="";
  cityDataSection.innerHTML=`<div class="col-start-1 col-end-2 row-start-1 row-end-3 h-[16vh] bg-blue-300 shadow-2xl rounded-md flex items-center flex-col justify-center">
            <h3 class="font-bold text-sm sm:text-2xl lg:text-2xl text-center">${data["name"]}</h3>
            <p class="font-medium text-[10px] sm:text-xl text-gray-500">${data["sys"]["country"]}</p>
        </div>

        <div class="col-start-2 col-end-3 row-start-1 row-end-3 h-[16vh] bg-blue-300 shadow-2xl rounded-md flex items-center flex-col justify-center">
            <p class="font-bold text-xl sm:text-3xl">${Math.round(Number(data["main"]["temp"]-273.15)*100)/100}<span class="font-semibold"> &#8451;</span></p>
            <p class="font-medium text-[10px] sm:text-base text-gray-700 hidden sm:block">Feels like <span>${Math.round(Number(data["main"]["feels_like"]-273.15)*100)/100}</span><span class="text-gray-500"> &#8451;</span></p>
        </div>

        <div class="col-start-1 col-end-5 row-start-3 row-end-5 flex flex-row h-[16vh] gap-[10px] sm:gap-[30px] w-[100%] justify-evenly">
            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] hidden items-center flex-col justify-center sm:flex">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">Time</h4>
                <p class="font-bold text-base sm:text-2xl">${timeNow}</p>
            </div>

            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] flex items-center flex-col justify-center">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">Humidity</h4>
                <p class="font-bold text-base sm:text-2xl">${data["main"]["humidity"]}<span class="text-gray-500"> %</span></p>
            </div>

            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] flex items-center flex-col justify-center">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">WindSpeed</h4>
                <p class="font-bold text-base sm:text-2xl">${data["wind"]["speed"]}<span class="text-gray-500"> m/s</span></p>
            </div>

            <div class="bg-blue-300 shadow-2xl rounded-md w-[30%] sm:w-[25%] flex items-center flex-col justify-center">
                <h4 class="font-medium text-sm sm:text-base text-gray-700">Altitude</h4>
                <p class="font-bold text-base sm:text-2xl">${Math.round(44330*((1-(((data["main"]["grnd_level"])/(data["main"]["sea_level"]))**(1/5.255)))))}<span class="text-gray-500"> meter</span></p>
            </div>
        </div>

        <div class="col-start-3 col-end-5 row-start-1 row-end-3 h-[16vh] bg-blue-300 shadow-2xl rounded-md flex items-center justify-evenly">
            <img src="https://cdn-icons-png.flaticon.com/512/7133/7133364.png" alt="" class="h-20 w-20">
            <p class="font-medium text-base text-center sm:text-justify sm:text-xl text-gray-700">${data["weather"][0]["description"]}</p>
        </div>`;
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

// Function to get searched city
const getSearchData= async (event)=>{
  let searchPlace=placeSearch.value;
  placeSearch.value='';
  let data=await getDataFromCityAPI(searchPlace);
  //console.log(data)
  let timeNow=getTimeNowInCity(data);
  renderCityAPIData(data,timeNow);
}

// function to get gps location
const getGeoData=(event)=>{
  console.log("Feature of geo location will be added later");
}

searchBtn.addEventListener('click',getSearchData);
geoLocationBtn.addEventListener('click',getGeoData);