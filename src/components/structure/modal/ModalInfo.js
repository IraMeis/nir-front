import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useContext} from "react";
import ModalContext from "../../context/ModalContext";
import modals from "../../../util/modalStatesDict.json";

const ModalInfo = () => {
    const modalContext = useContext(ModalContext);

    return (
        <Modal show={modalContext.modalState === modals.infoOpen}
               onHide={modalContext.handleClose}
               backdrop="static">

            <Modal.Header>
                <Modal.Title>
                    {modalContext.infoMess[0] != null ? modalContext.infoMess[0] : "Something happened..."}
                </Modal.Title>
                <button type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={modalContext.handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>

            <Modal.Body>
                {modalContext.infoMess[1] != null ? modalContext.infoMess[1] : "No description found"}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary"
                        onClick={modalContext.handleClose}>
                    Close
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModalInfo;