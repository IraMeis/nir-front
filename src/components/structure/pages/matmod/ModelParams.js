import React, {useContext} from "react";
import ChmmfContext from "../../../context/ChmmfContext";
import Separator from "../../Separator";

export default function ModelParams(){
    const chmmf = useContext(ChmmfContext);
    return (
        <>
            <div className="row">
                <div className={'col-md-1'}/>
                <div className={'col-md-10'}>
                    <div className="row ">
                        <div className={'col'}>
                            <label><h5>{'R:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'It'}
                                value={chmmf.RFiz}
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    if(n < 0)
                                        chmmf.setRFiz(0.1)
                                    else
                                        chmmf.setRFiz(n)
                                }}/>
                        </div>
                        <div className={'col'}>
                            <label><h5>{'T:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'Ix'}
                                value={chmmf.TFiz}
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    if(n < 0)
                                        chmmf.setTFiz(0.1)
                                    else
                                        chmmf.setTFiz(n)
                                }}/>
                        </div>
                        <div className={'col'}>
                            <label><h5>{'c:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'It'}
                                value={chmmf.cFiz}
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    if(n < 0)
                                        chmmf.setCFiz(0.1)
                                    else
                                        chmmf.setCFiz(n)
                                }}/>
                        </div>
                        <div className={'col'}>
                            <label><h5>{'k:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'Ix'}
                                value={chmmf.kFiz}
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    if(n < 0)
                                        chmmf.setKFiz(0.1)
                                    else
                                        chmmf.setKFiz(n)
                                }}/>
                        </div>
                    </div>
                </div>
                <div className={'col-md-1'}/>
            </div>

            <Separator.Separator1/>

            <div className="row ">
                <div className={'col-md-2'}/>
                <div className={'col-md-8'}>
                    <div className="row ">
                        <div className={'col'}>
                            <label><h5>{'I:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'It'}
                                value={chmmf.I}
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    if(n < 1)
                                        chmmf.setI(1)
                                    else
                                        chmmf.setI(n)
                                }}/>
                        </div>
                        <div className={'col'}>
                            <label><h5>{'K:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'Ix'}
                                value={chmmf.K}
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    if(n < 1)
                                        chmmf.setK(1)
                                    else
                                        chmmf.setK(n)
                                }}/>
                        </div>
                    </div>
                </div>
                <div className={'col-md-2'}/>
            </div>
        </>
    );
}