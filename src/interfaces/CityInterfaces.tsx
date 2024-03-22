export interface CitiesGeoDBResponse {
    data:     SimpleCity[];
    links:    Link[];
    metadata: Metadata;
}

export interface SimpleCity {
    id:          number;
    wikiDataId:  string;
    type:        string;
    city:        string;
    name:        string;
    country:     string;
    countryCode: string;
    region:      string;
    regionCode:  string;
    regionWdId:  string;
    latitude:    number;
    longitude:   number;
    population:  number;
}

export interface Link {
    rel:  string;
    href: string;
}

export interface Metadata {
    currentOffset: number;
    totalCount:    number;
}

export interface CityGeoDBResponse {
    data: FullCity;
}

export interface FullCity {
    id:              number;
    wikiDataId:      string;
    type:            string;
    city:            string;
    name:            string;
    country:         string;
    countryCode:     string;
    region:          string;
    regionCode:      string;
    regionWdId:      string;
    elevationMeters: number;
    latitude:        number;
    longitude:       number;
    population:      number;
    timezone:        string;
    deleted:         boolean;
}
