import {MapContainer, TileLayer, Marker, useMap, useMapEvents} from "react-leaflet";
import React, {useContext, useMemo, useRef} from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../../../../icons/marker.png";
import L from "leaflet";
import NetContext from "../../../../context/NetContext";

export default function MapGetCoordinate() {
    const netContext = useContext(NetContext)
    const position = netContext.position
    const markerRef = useRef(null)

    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 35],
        iconAnchor: [5, 30]
    });

    function MapView() {
        let map = useMap();
        map.setView(position, map.getZoom());
        return null;
    }

    function LocationMarker() {
        const map = useMapEvents({
            dblclick() {
                map.locate().on('locationfound', function(e){
                    netContext.setPosition(e.latlng)
                    map.flyTo(e.latlng, map.getZoom())
                })
            },
        })

        return  <Marker icon={customIcon}
                        position={position}
                        draggable={true}
                        eventHandlers={handleChangeCords}
                        ref={markerRef}/>

    }

    const handleChangeCords = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    netContext.setPosition(marker.getLatLng())
                    console.log(position)
                }
            },
        }),
        [netContext, position],
    )

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <div><small className='text-uppercase font-weight-bold text-danger'>set right location on map for data saving</small></div>
                    <div><small className='text-uppercase font-weight-bold text-danger'>double click will bring marker to your current location </small></div>
                    <p/>
                    <div><small className='text-uppercase font-weight-bold'>position:</small></div>
                    <div><small className='text-uppercase font-weight-bold'>lat {position['lat']}</small></div>
                    <div><small className='text-uppercase font-weight-bold'>lng {position['lng']} </small></div>
                    <p/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-1"/>
                <MapContainer
                    className="col-md-10 map-net"
                    center={position}
                    zoom={5}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
                                 contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker/>
                    <MapView/>
                </MapContainer>
                <div className="col-md-1"/>
            </div>
        </>
    );
}