export interface OpenWeatherResponse {
    coord:      Coord;
    weather:    Weather[];
    base:       string;
    main:       CurrentWeather;
    visibility: number;
    wind:       Wind;
    rain:       Rain;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface CurrentWeather {
    temp:        number;
    feels_like:  number;
    temp_min:    number;
    temp_max:    number;
    pressure:    number;
    humidity:    number;
    sea_level:   number;
    grnd_level:  number;
}

export interface SimpleCurrentWeather {
    temp: number;
    icon: string;
}

export interface Rain {
    "1h": number;
}

export interface Sys {
    country: string;
    sunrise: number;
    sunset:  number;
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}
