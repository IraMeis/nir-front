import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, {useContext} from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../../../../icons/marker.png";
import L from "leaflet";
import NetContext from "../../../../context/NetContext";

export default function MapGetCoordinate() {
    const netContext = useContext(NetContext);
    const { latitude, longitude } = netContext.coords;
    console.log(latitude);
    console.log(longitude);
    // console.log(longitude );
    // const { lat, long } = coords;

    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 35],
        iconAnchor: [5, 30]
    });

    function MapView() {
        let map = useMap();
        map.setView([latitude, longitude], map.getZoom());

        return null;
    }

    return (
        <div className="row">
            <div className="col-md-2"/>
            <MapContainer
                className="col-md-8 map-net"
                center={[latitude, longitude]}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
                                 contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={customIcon} position={[latitude, longitude]}>
                    <Popup>{'display_name'}</Popup>
                </Marker>
                <MapView/>
            </MapContainer>
            <div className="col-md-2"/>
        </div>
    );
}