export interface LatLng{
    latitude: number;
    longitude: number;
}
export interface Bin{
    _id: string;
    location: LatLng;
    battery: number;
    fullness: number;
}