import modals from "../../../util/modalStatesDict.json";
import React, {useContext} from "react";
import ModalInfo from "./ModalInfo";
import ModalContext from "../../context/ModalContext";

const ModalInfoBlock = () => {
    const modalContext = useContext(ModalContext);
    return(
        <div>
            {modalContext.modalState === modals.infoOpen && <ModalInfo/>}
        </div>
    );
}

export default ModalInfoBlock;