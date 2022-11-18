import React, {useContext} from "react";
import ChmmfContext from "../../../context/ChmmfContext";
import ChmmfService from "../../../../service/chmmf.service";
import ModalContext from "../../../context/ModalContext";

const RunButtons = () => {
    const chmmf = useContext(ChmmfContext);
    const modalContext = useContext(ModalContext);

    function makeFormData(){
        let formData = new FormData();
        formData.append("RFiz", chmmf.RFiz)
        formData.append("TFiz", chmmf.TFiz)
        formData.append("kFiz", chmmf.kFiz)
        formData.append("cFiz", chmmf.cFiz)
        formData.append("I", chmmf.I)
        formData.append("K", chmmf.K)
        formData.append("isxlim", chmmf.isxlim ? '1' : '0')
        formData.append("isylim", chmmf.isylim ? '1' : '0')
        if(chmmf.isxlim) {
            formData.append('xlim', chmmf.xlim)
        }
        if(chmmf.isylim) {
            formData.append('ylim', chmmf.ylim)
        }
        return formData;
    }

    const handleEvalModelT = () => {
        ChmmfService.evalT(makeFormData())
            .then((response) => {
                console.log(response.data)
                chmmf.setImage(response.data)
            })
            .catch((err) => {
                console.log(err);
                modalContext.setInfoMess(['Something went wrong', err.message]);
                modalContext.handleShowModalInfo();
            });
    }

    const handleEvalModelR = () => {
        ChmmfService.evalR(makeFormData())
            .then((response) => {
                chmmf.setImage(response.data)
            })
            .catch((err) => {
                console.log(err);
                modalContext.setInfoMess(['Something went wrong', err.message]);
                modalContext.handleShowModalInfo();
            });
    }

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <h5>Indexes by T:</h5>
                    <input
                        className="form-control"
                        type="text"
                        value={chmmf.indt}
                        onChange={(event) => {
                            chmmf.setIndt(event.target.value)
                        }}/>
                    <p/>
                    <button type="button"
                            onClick={handleEvalModelT}
                            className="btn btn-outline-secondary m-0 rounded-pill px-4">
                        <i className="fa fa-cloud-upload mr-2 text-muted"/>
                        <small className="text-uppercase font-weight-bold">
                            {'Eval by T'}
                        </small>
                    </button>
                </div>
                <div className="col text-center">
                    <h5>Indexes by R:</h5>
                    <input
                        className="form-control"
                        type="text"
                        value={chmmf.indr}
                        onChange={(event) => {
                            chmmf.setIndr(event.target.value)
                        }}/>
                    <p/>
                    <button type="button"
                            onClick={handleEvalModelR}
                            className="btn btn-outline-secondary m-0 rounded-pill px-4">
                        <i className="fa fa-cloud-upload mr-2 text-muted"/>
                        <small className="text-uppercase font-weight-bold">
                            {'Eval by R'}
                        </small>
                    </button>
                </div>
            </div>

        </>
    );
}

export default RunButtons;