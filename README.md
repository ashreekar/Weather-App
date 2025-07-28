Weather App

# Author: Ashreek A R

This is a real time weather application using HTML,tailwind CSS and JavaScript. Users can search for any cities weather data which includes parameters like Temperature, Wind speed, humidity, time, altitude and weather details with related images. This has additional feature of weather forecast for 5 days from today with same datas.

Technologies used: HTML, CSS, Tailwind CSS, JavaScript, OpenWeatheMap API.

# GitHub link
[GitHub Link](https://github.com/ashreekar/Weather-App)

Git repo name : Weather-App
Author : Ashreek A R 
Git repo link : https://github.com/ashreekar/Weather-App.git

# Setup
1) Install tailwind CSS using https://tailwindcss.com/docs/installation/tailwind-cli
2) Aquire the OpenWeatherMapAPI from https://openweathermap.org/api
3) Get live data API for live data for a place and forecast API for wather forecast in future.
4) Get the API key from https://openweathermap.org/api by logging in or creating the account if you are a new user.
    API Keys looks like this,
            api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
            api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
            api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
            api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    First two are for string searches and other two are for geoloaction based searching using latitude and longitude.
5) Reference image link looks like https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png
5) Then you are good to go.

# Folder structure:

componets
    --bg
    --fevicon
    --header
src
    --index.html
    -- input.css
    -- output.css
    -- script.js
package-lock.json
package.json
README.md

Features:

1) Search by place name.
2) Search using GPS.
3) Suggention of latest searched places (upto 6).
4) Added extended weather forecast for 5 days.
5) Error handling when there is server error.
6) User input handling with proper rendering of user instructions.