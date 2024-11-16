export interface ITableData {
    id: string
    full_name: string
    status: string
    location: Location
    landing_type: string
    attempted_landings: number
    successful_landings: number
    wikipedia: string
    details: string
}

export interface IMapValue {
    latitude: number;
    longitude: number,
    region: string
}

export interface Location {
    name: string
    region: string
    latitude: number
    longitude: number
}
