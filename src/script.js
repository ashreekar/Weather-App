let search_bar=document.querySelector("input");
let search_button=document.querySelector("#search-btn");
let display_place=document.querySelector("#display-place");
let datas;

let api=``;

function renderUI(datas){
    display_place.innerHTML=`<article class="w-[50%] flex flex-col items-center justify-between">
    <div class="flex w-[50%] justify-start gap-1 font-bold">
        <h2>${datas["name"]}</h2>
        <p><span>, </span>${datas["sys"]["country"]}</p>
    </div class="flex w-[50%] justify-between">
    
    <div class="flex w-[50%] justify-between">
        <p>Temparature</p>
        <p>${Math.floor(datas["main"]["temp"]-273.15)}</p>
    </div>

    <div class="flex w-[50%] justify-between">
        <p>Humidity</p>
        <p>${datas["main"]["humidity"]}</p>
    </div>

    <div class="flex w-[50%] justify-between">
        <p>Windspeed</p>
        <p>${datas["wind"]["speed"]}</p>
    </div>
    </article>

    <article class="w-[50%] flex flex-col items-center justify-center">
       <img src="../components/cloudy.png" alt="" class="h-[50px
       ] w-[50px]">
       <p>${datas["weather"][0]["description"]}</p>
    </article>`
}

async function fetchData(place){
    //api=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b874179f1b2c1ec026bff4eb0777ce2b`;
    
    let result={
  "coord": {
    "lon": 75.5667,
    "lat": 13.9167
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 295.64,
    "feels_like": 296.43,
    "temp_min": 295.64,
    "temp_max": 295.64,
    "pressure": 1009,
    "humidity": 95,
    "sea_level": 1009,
    "grnd_level": 936
  },
  "visibility": 2659,
  "wind": {
    "speed": 4.57,
    "deg": 240,
    "gust": 9.85
  },
  "clouds": {
    "all": 100
  },
  "dt": 1753169016,
  "sys": {
    "country": "IN",
    "sunrise": 1753144759,
    "sunset": 1753190921
  },
  "timezone": 19800,
  "id": 1256515,
  "name": "Shimoga",
  "cod": 200
};
    // try{
    //     let response=await fetch(api);
    //     result=await response.json();
    // }catch(err){
    //     console.log(err);
    //     return;
    // }
    return result;

}

async function getDataToCall(){
    // if(search_bar.value==""){
    //     return;
    // }

     let city=search_bar.value;

    datas=await fetchData(city);

    renderUI(datas);
}

search_button.addEventListener('click',getDataToCall);