# RN-Weather
Weather app built with React Native.

## Features
 * City search
 * Show weather info, such as: 
 
   - Min temperature
   - Max temperature
   - Temperature
   - Cloudiness
   - Visibility
   - Humidity
   - Atmospheric pressure
   - 5 day / 3 hour forecast
 
## Installation
1. Clone the repository
```bash
git clone https://github.com/Fernando-LRz/RN-Weather.git
``` 
2. Go inside the project folder
```bash
cd RN-Weather
```
3. Install dependencies
```bash
npm install
```

## Configuration
 * An api key from RapidAPI GeoDB Cities is required and must be set in the GeoDBApi.tsx file, located at: src/api.

 * An api key from OpenWeather is required and must be set in the OpenWeatherApi.tsx file, located at: src/api.

## Run the app
```bash
npx react-native run-android
```
