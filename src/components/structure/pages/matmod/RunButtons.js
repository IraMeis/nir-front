import React, {useContext, useState} from "react";
import ChmmfContext from "../../../context/ChmmfContext";
import ChmmfService from "../../../../service/chmmf.service";
import ModalContext from "../../../context/ModalContext";

const RunButtons = () => {
    const chmmf = useContext(ChmmfContext);
    const modalContext = useContext(ModalContext);

    const [evalParam, setEvalParam] = useState('t')

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
        formData.append('ind', chmmf.ind)
        if(chmmf.isxlim) {
            formData.append('xlim', chmmf.xlim)
        }
        if(chmmf.isylim) {
            formData.append('ylim', chmmf.ylim)
        }
        return formData;
    }

    const handleEvalModel = () => {
        ChmmfService.evalModel(makeFormData(), evalParam)
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

    return (
        <>
            <div className="row">
                <div className="col-md-2 text-center"/>
                <div className="col-md-8 text-center">
                    <h5>Indexes:</h5>
                    <input
                        className="form-control"
                        type="text"
                        value={chmmf.ind}
                        onChange={(event) => {
                            event.preventDefault()
                            chmmf.setInd(event.target.value)
                        }}/>
                    <p/>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button"
                                className="btn btn-secondary"
                                onClick ={handleEvalModel}>
                            Get dynamic by
                        </button>
                        <button type="button"
                                className="btn btn-danger"
                                onClick ={() => {
                                    if(evalParam === 't')
                                        setEvalParam('r')
                                    else if(evalParam === 'r')
                                        setEvalParam('t')
                                }}>
                            {evalParam.toUpperCase()}
                        </button>
                    </div>
                </div>
                <div className="col-md-2 text-center"/>
            </div>

        </>
    );
}

export default RunButtons;