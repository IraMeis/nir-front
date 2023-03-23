import clear from "../../../../../icons/clear.png";
import refresh from "../../../../../icons/refresh.png";
import start from "../../../../../icons/start.png";
import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import Constants from "../../../../../util/Constants";
import fileT from "../../../../../util/fileType.json";
import models from "../../../../../util/netModels.json";
import ModalContext from "../../../../context/ModalContext";
import UploadService from "../../../../../service/run.service";

const ImageManagmentButtons = () => {
    const netContext = useContext(NetContext)
    const modalContext = useContext(ModalContext)

    const clearFile = () => {
        netContext.setFileType(fileT.image)
        netContext.setCurrentScannedFileURL("")
        netContext.setCurrentFileURL("")
        netContext.setCurrentSelectedFileURL("")
        netContext.setCurrentSelectedFile(null)
        netContext.setCurrentSelectedFileName("")
        netContext.setCurrentScannedFileEVAL(null)
    };

    const rollbackFile = () => {
        if(netContext.currentFileURL !== "" && netContext.currentScannedFileURL !== "") {
            if (netContext.currentFileURL === netContext.currentScannedFileURL)
                netContext.setCurrentFileURL(netContext.currentSelectedFileURL);
            else if (netContext.currentFileURL === netContext.currentSelectedFileURL)
                netContext.setCurrentFileURL(netContext.currentScannedFileURL);
        }
    };

    const changeModel = () => {
        for (let i = 0; i < models.length; ++i)
            if(models[i].label === netContext.model)
                netContext.setModel(models[(i + 1) % models.length].label)
    };

    const evaluate = () => {
        if(netContext.currentSelectedFile) {
            netContext.setCurrentScannedFileEVAL(null);
            if (netContext.fileType === fileT.video) {
                netContext.setFileType(fileT.wait);
                UploadService.uploadVideo(netContext.currentSelectedFile, String(netContext.model))
                    .then((response) => {
                        const url = URL.createObjectURL(response.data);

                        const uuid = response.headers["content-disposition"] &&
                            response.headers["content-disposition"].match(Constants.regexExp)[0];
                        netContext.setCurrentFileURL(url);
                        netContext.setCurrentScannedFileURL(url);
                        netContext.setFileType(fileT.video);
                        console.log(uuid)

                        if (uuid)
                            UploadService.getAdditionalDataVideo(uuid)
                                .then((response) => {
                                    netContext.setCurrentScannedFileEVAL(response.data);
                                })
                    })
                    .catch((err) => {
                        netContext.setFileType(fileT.video);
                        console.log(err);
                        modalContext.setInfoMess(['Something went wrong', err.message]);
                        modalContext.handleShowModalInfo();
                    });
            } else if (netContext.fileType === fileT.image) {
                netContext.setFileType(fileT.wait);
                UploadService.uploadImage(netContext.currentSelectedFile, String(netContext.model))
                    .then((response) => {
                        netContext.setFileType(fileT.image);
                        const url = URL.createObjectURL(response.data);
                        netContext.setCurrentFileURL(url);
                        netContext.setCurrentScannedFileURL(url);

                        const name = response.headers["content-disposition"] &&
                            response.headers["content-disposition"].match(Constants.imgName)[0];
                        if (name)
                            UploadService.getAdditionalDataImage(name)
                                .then((response) => {
                                    netContext.setCurrentScannedFileEVAL(response.data);
                                })
                        console.log(name)
                    })
                    .catch((err) => {
                        netContext.setFileType(fileT.image);
                        console.log(err);
                        modalContext.setInfoMess(['Something went wrong', err.message]);
                        modalContext.handleShowModalInfo();
                    });
            }
            else if (netContext.fileType === fileT.wait) {
                modalContext.setInfoMess(['Your request has been sent',
                    "Clicking on this button won't speed up processing of the request"]);
                modalContext.handleShowModalInfo();
            }
        }
    }

    return (
        <div className="row">

            <div className="col text-center">
                <button type="button"
                        onClick={clearFile}
                        className="btn btn-outline-warning btn-circle-img">
                    <img className="rounded mx-auto d-block img-fluid"
                         src={clear}
                         alt=""/>
                </button>
            </div>

            <div className="col text-center">
                <button type="button"
                        onClick={rollbackFile}
                        className="btn btn-outline-secondary m-0 btn-circle-img">
                    <img className="rounded mx-auto d-block img-fluid"
                         src={refresh}
                         alt=""/>
                </button>
            </div>

            <div className="col text-center">
                <button type="button"
                        onClick={changeModel}
                        className="btn btn-outline-secondary m-0 rounded-pill px-4">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <small className="text-uppercase font-weight-bold">
                        {netContext.model}
                    </small>
                </button>
            </div>

            <div className="col text-center">
                <button type="button"
                        onClick={evaluate}
                        className="btn btn-outline-warning btn-circle-img btn-circle-img-start">
                    <img className="rounded mx-auto d-block img-fluid"
                         src={start}
                         alt=""/>
                </button>
            </div>

        </div>
    );
}

export default ImageManagmentButtons;