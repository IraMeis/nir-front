import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import fileT from "../../../../../util/fileType.json";
import UploadService from "../../../../../service/run.service";
import ModalContext from "../../../../context/ModalContext";


export default function SaveButtons ()  {
    const netContext = useContext(NetContext);
    const modalContext = useContext(ModalContext);
    const position = netContext.position;
    const evaluation = netContext.currentScannedFileEVAL;

    const handleSave = () => {
        if (evaluation && position) {
            if (netContext.fileType === fileT.video || netContext.fileType === fileT.image) {
                UploadService.saveEval(
                    {
                        eval: evaluation,
                        coords: position,
                        type: netContext.fileType === fileT.video ? 'video' : 'image'
                    })
                    .then(()=> {
                        modalContext.setInfoMess(['OK', 'Data was saved'])
                        modalContext.handleShowModalInfo();
                    })
                    .catch((err) => {
                        console.log(err);
                        modalContext.setInfoMess(['Something went wrong', err.message]);
                        modalContext.handleShowModalInfo();
                    });
            }
        } else {
            modalContext.setInfoMess(['Not enough data', "Position or evaluation missed"]);
            modalContext.handleShowModalInfo();
        }
    }

    return (
        <div className="row">
            <div className="col text-center">
                <button type="button"
                        onClick={handleSave}
                        className="btn btn-outline-secondary m-0 rounded-pill px-4">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <small className="text-uppercase font-weight-bold">
                        save results
                    </small>
                </button>
            </div>

        </div>
    );
}