import modals from '../../../../util/modalStatesDict.json';
import ModalContext from '../../../context/ModalContext';
import React, {useState} from "react";
import Nets from "./Nets";

const ModalWrapper = () => {

    const [infoMess, setInfoMess] = useState([]);
    const [modalState, setModalState] = useState(modals.close);

    //модалка информации
    const handleShowModalInfo = () => {
        setModalState(modals.infoOpen);
    }
    //закрытие
    const handleClose = () => {
        setModalState(modals.close);
    }

    return (
        <ModalContext.Provider value={{
            infoMess : infoMess,
            setInfoMess : setInfoMess,
            modalState : modalState,
            handleShowModalInfo : handleShowModalInfo,
            handleClose : handleClose,
        }}>
            <Nets/>
        </ModalContext.Provider>
    );
};

export default ModalWrapper;
