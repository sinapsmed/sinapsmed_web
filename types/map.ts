import { LatLngTuple } from "leaflet";

export interface Position {
    coords: LatLngTuple;
    place: string; 
}