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


const getDataFromCityAPI=(place)=>{
    let API=``;
}

// Function to get searched city
const getSearchData=(event)=>{
  let searchPlace=placeSearch.value;
  placeSearch.value='';
  let data=getDataFromCityAPI(searchPlace);
}

// function to get gps location
const getGeoData=(event)=>{
  console.log("Feature of geo location will be added later");
}

searchBtn.addEventListener('click',getSearchData);
geoLocationBtn.addEventListener('click',getGeoData);