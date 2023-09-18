export type DogT = {
    id: DogIdT
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export type DogIdT = string

export type LocationT = {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

export type CoordinatesT = {
    lat: number;
    lon: number;
}

export type MatchT = {
    match: string
}

export type SortByT = 'breed' | 'age' | 'name' | 'zip_code'
export type SortingOrderT = 'asc' | 'desc'
export type SearchCriteriaT = {
    breeds?: string[]
    zipCodes?: string[]
    ageMin?: string
    ageMax?: string
    sortBy?: SortByT
    sortingOrder?: SortingOrderT
    size?: number
}

export type DogSearchResponseT = {
    next?: string
    prev?: string
    resultIds: DogIdT[]
    total: number
}

export type AuthParamsT = {
    name: string
    email: string
}