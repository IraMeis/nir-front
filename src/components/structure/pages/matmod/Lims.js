import React, {useContext} from "react";
import ChmmfContext from "../../../context/ChmmfContext";

export default function Lims() {
    const chmmf = useContext(ChmmfContext);

    return (
        <div>
            <div className="row">
                <div className="col-md-1"/>
                <div className="col-md-5">
                    <div>
                        <input className="form-check-input" type="checkbox"
                               name={`scope`} id="inlineCheckbox11"
                               onChange={() => {
                                   chmmf.setIsXlim(!chmmf.isxlim)
                               }}
                               checked={chmmf.isxlim}/>
                        <label><h5>{'X lim:'}</h5></label>
                    </div>
                    <div className={'my-auto row'}>
                        {chmmf.xlim.map((elem, index) => (
                            <div className={'my-auto col'}>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="delay"
                                    onChange={(event) => {
                                        const n = Number(event.target.value)
                                        let mas = chmmf.xlim.slice();
                                        mas[index] = n;
                                        chmmf.setXlim(mas)
                                    }}
                                    value={chmmf.xlim[index]}
                                />
                            </div>))
                        }
                    </div>
                </div>
                <div className="col-md-5">
                    <div>
                        <input className="form-check-input" type="checkbox"
                               name={`scope`} id="inlineCheckbox11"
                               onChange={() => {
                                   chmmf.setIsYlim(!chmmf.isylim)
                               }}
                               checked={chmmf.isylim}/>
                        <label><h5>{'Y lim:'}</h5></label>
                    </div>
                    <div className={'my-auto row'}>
                        {chmmf.ylim.map((elem, index) => (
                            <div className={'my-auto col'}>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="delay"
                                    onChange={(event) => {
                                        const n = Number(event.target.value)
                                        let mas = chmmf.ylim.slice();
                                        mas[index] = n;
                                        chmmf.setYlim(mas)
                                    }}
                                    value={chmmf.ylim[index]}
                                />
                            </div>))
                        }
                    </div>
                </div>
                <div className="col-md-1"/>
            </div>
        </div>
    );
}