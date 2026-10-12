'use client'
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Icon, LatLngTuple } from "leaflet";
import marker from "@/public/location-pin.png";
import { Position } from "@/types/map";
import { useTranslations } from "next-intl";

async function GetLocation(lat: number, lng: number) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        return data.display_name ?? "Unknown location"
    } catch (error) {
        return "Unknown location"
    }
}

const myIcon = new Icon({
    iconUrl: marker.src,
    iconSize: [30, 30]
});

interface Props {
    value: Position,
    onChange: (value: Position) => void
}

const MapComponent = ({ value, onChange }: Props) => {
    const t = useTranslations('analyses.filter.map')
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null)
    const handleSearch = async () => {
        if (searchQuery.trim() === "") return;
        setError(null)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            onChange({ coords: [lat, lng], place: data[0].display_name });
        } else {
            setError(t('error'));
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const latitude = pos.coords.latitude;
                    const longitude = pos.coords.longitude;
                    const displayName = await GetLocation(latitude, longitude)
                    onChange({
                        coords: [latitude, longitude],
                        place: displayName,
                    })
                }
            )
        }
    }, [onChange]);

    return (
        <>
            <div className="absolute top-4 right-0 sm:right-4 z-10 space-y-1 bg-white p-2 rounded shadow-md">
                <div className="flex gap-1">
                    <input
                        type="text"
                        inputMode="search"
                        placeholder={t('search.input')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded p-1 w-full"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white rounded px-2">{t('search.button')}</button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
            <MapContainer
                className="h-full w-full z-0"
                center={value.coords}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={value.coords} icon={myIcon}>
                    <Popup>{value.place}</Popup>
                </Marker>
                <MapClickHandler onChange={onChange} />
                <MapView center={value.coords} />
            </MapContainer>
        </>
    );
}

interface MapClickHandlerProps {
    onChange: (value: Position) => void;
}

const MapClickHandler = ({ onChange }: MapClickHandlerProps) => {
    useMapEvents({
        async click(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            onChange({ coords: [lat, lng], place: "Loading..." });
            const displayName = await GetLocation(lat, lng)
            onChange({ coords: [lat, lng], place: displayName });
        }
    });
    return null;
};

interface MapViewProps {
    center: LatLngTuple;
}

const MapView = ({ center }: MapViewProps) => {
    const map = useMap();
    map.setView(center, map.getZoom(), { animate: true });
    return null;
};

export default MapComponent;
