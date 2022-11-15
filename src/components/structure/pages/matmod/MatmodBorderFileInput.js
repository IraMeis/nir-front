import React, {useContext} from "react";
import MatmodContext from "../../../context/MatmodContext";
import Separator from "../../Separator";

const MatmodBorderFileInput = () => {
    const matmod = useContext(MatmodContext);
    return (
        <>
            <div className="row">
                <div className="col-md-2 text-center"/>
                <div className="col-md-8 text-center">
                    <label htmlFor="inputAddress"><h5>{'Set border files (else null borders auto set)'}</h5></label>
                    <input className="form-check-input" type="checkbox"
                           name={`scope`} id="inlineCheckbox1"
                           value={matmod.isBord}
                           onChange={matmod.handleChangeIsBord}
                           checked={matmod.isBord}/>
                </div>
                <div className="col-md-2 text-center"/>
            </div>
            <Separator.Separator3/>

            {matmod.isBord &&
            <>
                <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                    <input id="upload"
                           type="file"
                           onChange={matmod.selectInitFilesBord}
                           className="form-control border-0"
                           multiple/>
                    <label id="upload-label"
                           htmlFor="upload"
                           className="font-weight-light text-muted">
                        <strong>{matmod.textInitFilesBord.length === 0 ? 'No files' : 'Files added'}</strong>
                    </label>

                    <div className="input-group-append">
                        <label htmlFor="upload"
                               className="btn btn-warning m-0 rounded-pill px-4">
                            <i className="fa fa-cloud-upload mr-2 text-muted"/>
                            <small className="text-uppercase font-weight-bold text-muted">
                                Choose border files
                            </small>
                        </label>
                    </div>
                </div>
                <Separator.Separator2/>
            </>
            }
        </>
    );
}

export default MatmodBorderFileInput;