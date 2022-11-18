import React, {useState} from "react";
import FileInputForm from "./fileInputElements/FileInputForm";
import NetContext from '../../../context/NetContext';
import models from '../../../../util/netModels.json';
import fileT from '../../../../util/fileType.json';
import ModalInfo from "../../modal/ModalInfo";

const Nets = () => {

    // current rendered image|video
    const [currentFileURL, setCurrentFileURL] = useState("");

    // user input
    const [currentSelectedFile, setCurrentSelectedFile] = useState(null)
    const [currentSelectedFileURL, setCurrentSelectedFileURL] = useState("")
    const [currentSelectedFileName, setCurrentSelectedFileName] = useState("")

    // after processing
    const [currentScannedFileURL, setCurrentScannedFileURL] = useState("")
    const [currentScannedFileEVAL, setCurrentScannedFileEVAL] = useState(null)

    const [model, setModel] = useState(models[0].label)

    const [fileType, setFileType] = useState(fileT.image)

    return (
        <NetContext.Provider value={{
            currentFileURL,
            setCurrentFileURL,

            currentSelectedFileURL,
            setCurrentSelectedFileURL,

            currentScannedFileURL,
            setCurrentScannedFileURL,

            currentSelectedFileName,
            setCurrentSelectedFileName,

            currentScannedFileEVAL,
            setCurrentScannedFileEVAL,

            currentSelectedFile,
            setCurrentSelectedFile,

            model,
            setModel,

            fileType,
            setFileType

        }}>
            <ModalInfo/>
            <FileInputForm/>
        </NetContext.Provider>
    );
};
export default Nets;
