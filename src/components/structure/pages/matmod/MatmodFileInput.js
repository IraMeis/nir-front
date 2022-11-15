import React, {useContext} from "react";
import MatmodContext from "../../../context/MatmodContext";

const MatmodFileInput = () => {
    const matmod = useContext(MatmodContext);
    return (
        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
            <input id="upload"
                   type="file"
                   onChange={matmod.selectInitFiles}
                   className="form-control border-0"
                   multiple/>
            <label id="upload-label"
                   htmlFor="upload"
                   className="font-weight-light text-muted">
                <strong>{matmod.imagesInitFiles.length === 0 ? 'No files' : 'Files added'}</strong>
            </label>

            <div className="input-group-append">
                <label htmlFor="upload"
                       className="btn btn-warning m-0 rounded-pill px-4">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <small className="text-uppercase font-weight-bold text-muted">
                        Choose T = 0 files
                    </small>
                </label>
            </div>
        </div>
            );
}

export default MatmodFileInput;