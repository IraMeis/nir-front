import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ModalContext from './components/context/ModalContext';
import NavBar from "./components/structure/NavBar";
import Routing from "./components/structure/Routing";
import {useState} from "react";
import modals from "./util/modalStatesDict.json";

const App = () => {

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
            <NavBar/>
            <Routing/>
        </ModalContext.Provider>
    );
};

export default App;
