import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import Constants from "../../../../../util/Constants";
import fileT from "../../../../../util/fileType.json";

const FileCheckField = () => {
    const netContext = useContext(NetContext);

    const selectFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);

        const end = String(file.name).split(".").pop().toLowerCase();
        if(Constants.videos.indexOf(end) !== -1)
            netContext.setFileType(fileT.video)
        else if (Constants.images.indexOf(end) !== -1)
            netContext.setFileType(fileT.image)
        else
            netContext.setFileType(fileT.other)

        netContext.setCurrentScannedFileURL("");
        netContext.setCurrentFileURL(url);
        netContext.setCurrentSelectedFileURL(url);
        netContext.setCurrentSelectedFile(file);
        netContext.setCurrentSelectedFileName(file.name);
        netContext.setCurrentScannedFileEVAL(null);
    };

    return (
        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
            <input id="upload"
                   type="file"
                   onChange={selectFile}
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