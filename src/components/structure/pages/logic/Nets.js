import React, {useContext, useState} from "react";
import FileInputForm from "./fileInputElements/FileInputForm";
import NetContext from '../../../context/NetContext';
import models from '../../../../util/netModels.json';
import UploadImage from "../../../../service/run.service";
import ModalContext from "../../../context/ModalContext";
import ModalInfo from "../../modal/ModalInfo";

const Nets = () => {

    const [currentFileURL, setCurrentFileURL] = useState("");

    const [currentSelectedFile, setCurrentSelectedFile] = useState(null);
    const [currentSelectedFileURL, setCurrentSelectedFileURL] = useState("");
    const [currentSelectedFileName, setCurrentSelectedFileName] = useState("");

    const [currentScannedFileURL, setCurrentScannedFileURL] = useState("");

    const [model, setModel] = useState(models[0].label);

    const selectFile = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setCurrentScannedFileURL("");
        setCurrentFileURL(url);
        setCurrentSelectedFileURL(url);
        setCurrentSelectedFile(file);
        setCurrentSelectedFileName(file.name);
    };

    const clearFile = () => {
        setCurrentScannedFileURL("");
        setCurrentFileURL("");
        setCurrentSelectedFileURL("");
        setCurrentSelectedFile(null);
        setCurrentSelectedFileName("");
    };

    const rollbackFile = () => {
        if(currentFileURL !== "" && currentScannedFileURL !== "") {
            if (currentFileURL === currentScannedFileURL)
                setCurrentFileURL(currentSelectedFileURL);
            else if (currentFileURL === currentSelectedFileURL)
                setCurrentFileURL(currentScannedFileURL);
        }
    };

    const changeModel = () => {
        for (let i = 0; i < models.length; ++i)
            if(models[i].label === model)
                setModel(models[(i + 1) % models.length].label)
    };

    const modalContext = useContext(ModalContext);

    const evaluate = () => {
        if(currentSelectedFile)
            UploadImage(currentSelectedFile, String(model))
                .then((response) => {
                    const url = URL.createObjectURL(response.data);
                    setCurrentFileURL(url);
                    setCurrentScannedFileURL(url);})
                .catch((err) => {
                    modalContext.setInfoMess(['Something went wrong', err.message]);
                    modalContext.handleShowModalInfo();
                });
    }

    return (
        <NetContext.Provider value={{
            currentFileURL : currentFileURL,
            currentSelectedFileName : currentSelectedFileName,
            selectFile : selectFile,
            clearFile : clearFile,
            rollbackFile : rollbackFile,
            changeModel : changeModel,
            evaluate : evaluate,
            model : model
        }}>
            <ModalInfo/>
            <FileInputForm/>
        </NetContext.Provider>
    );
};
export default Nets;
