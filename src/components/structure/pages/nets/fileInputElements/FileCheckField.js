import {useContext} from "react";
import NetContext from "../../../../context/NetContext";

const FileCheckField = () => {
    const netContext = useContext(NetContext);
    return (
        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
            <input id="upload"
                   type="file"
                   onChange={netContext.selectFile}
                   className="form-control border-0"/>
            <label id="upload-label"
                   htmlFor="upload"
                   className="font-weight-light text-muted">
                {netContext.currentSelectedFileName}
            </label>

            <div className="input-group-append">
                <label htmlFor="upload"
                       className="btn btn-warning m-0 rounded-pill px-4">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <small className="text-uppercase font-weight-bold text-muted">
                        Choose file
                    </small>
                </label>
            </div>

        </div>
    );
}

export default FileCheckField;