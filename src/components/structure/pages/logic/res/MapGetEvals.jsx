import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import React, {useContext, useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../../../../icons/marker.png";
import L from "leaflet";
import Separator from "../../../Separator";
import UploadService from "../../../../../service/run.service";
import ModalContext from "../../../../context/ModalContext";

export default function MapGetEvals() {
    const [reqData, setReqData] = useState()

    const [dfrom, setDfrom] = useState();
    const onChangeDfrom = (e) => {
        const content = e.target.value;
        setDfrom(content);
    }

    const [dto, setDto] = useState();
    const onChangeDto = (e) => {
        const content = e.target.value;
        setDto(content);
    }

    const modalContext = useContext(ModalContext);

    const makeSearchRequest = () => {
        let list = [];
        const formatter = (date, sep) => {
            let mas = [date.substring(5, 7), date.substring(8, 10), date.substring(0, 4)];
            return mas.join(sep);
        }
        if(dfrom != null)
            list.push("from=" + formatter(dfrom.toString(), "."));
        if(dto != null)
            list.push("to=" + formatter(dto.toString(), "."));
        let filter = list.join("&");
        return "?" + filter;
    }

    const handleUpdate = () => {
        UploadService.getEvals(makeSearchRequest())
            .then((response) => {
                setReqData(response.data)
                 console.log(response.data)
                // window.location.reload();
            })
            .catch((err) => {
                modalContext.setInfoMess(['Something went wrong', err.message]);
                modalContext.handleShowModalInfo();
            })
    }


    function FlyMapTo(props) {
        const map = useMap();
        useEffect(() => {
            map.flyTo(props.center, props.zoom);
        });
        return null;
    }

    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 35],
        iconAnchor: [5, 30]
    });

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <div><h5 className='text-uppercase font-weight-bold'>evaluations</h5></div>
                    <p/>
                </div>
            </div>

            <div className='text-center'>
                <label className="text-uppercase font-weight-bold">set time period</label>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label className="text-uppercase " htmlFor="inputEmail4">from</label>
                        <input type="date"
                               className="form-control"
                               onChange={onChangeDfrom}/>
                    </div>
                    <div className="form-group col-md-2"/>
                    <div className="form-group col-md-5">
                        <label className="text-uppercase " htmlFor="inputPassword4">to</label>
                        <input type="date"
                               className="form-control"
                               onChange={onChangeDto}/>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col text-center">
                    <button type="button"
                            onClick={handleUpdate}
                            className="btn btn-outline-secondary m-0 rounded-pill px-4">
                        <i className="fa fa-cloud-upload mr-2 text-muted"/>
                        <small className="text-uppercase font-weight-bold">
                            update
                        </small>
                    </button>
                </div>
            </div>

            <Separator.Separator1/>

            <div className="row">
                <MapContainer
                    className="col map-net"
                    center={reqData && reqData.data && reqData.data[0] ? reqData.data[0].coords : [53, 53]}
                    zoom={7}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
                                 contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {reqData && reqData.data &&
                    reqData.data.map((obj, idx) =>
                        <Marker key={`marker-${idx}`}
                                icon={customIcon}
                                position={obj.coords}>
                            <Popup className={'text-center'}>
                                <div className='text-uppercase font-weight-bold'><h6>Total: {obj.eval.ALL}</h6></div>
                                <div className='text-uppercase font-weight-bold'><h7>D00: {obj.eval.D00}</h7></div>
                                <div className='text-uppercase font-weight-bold'><h7>D10: {obj.eval.D10}</h7></div>
                                <div className='text-uppercase font-weight-bold'><h7>D20: {obj.eval.D20}</h7></div>
                                <div className='text-uppercase font-weight-bold'><h7>D40: {obj.eval.D40}</h7></div>
                                <br/>
                                <div><h7>{obj.date}, {obj.type}</h7></div>
                            </Popup>
                        </Marker>)}

                    <FlyMapTo center={reqData && reqData.data && reqData.data[0] ? reqData.data[0].coords : [50, 50]} zoom={7} />
                </MapContainer>
            </div>
        </>
    );
}