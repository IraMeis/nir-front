import React, {useState} from "react";
import FileInputForm from "./fileInputElements/FileInputForm";
import NetContext from '../../../context/NetContext';

const Nets = () => {

    const [currentFileURL, setCurrentFileURL] = useState("");

    const [currentSelectedFile, setCurrentSelectedFile] = useState();
    const [currentSelectedFileURL, setCurrentSelectedFileURL] = useState("");
    const [currentSelectedFileName, setCurrentSelectedFileName] = useState("");

    const [currentScannedFileURL, setCurrentScannedFileURL] = useState("");

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

    return (
        <NetContext.Provider value={{
            currentFileURL : currentFileURL,
            currentSelectedFileName : currentSelectedFileName,
            selectFile : selectFile,
            clearFile : clearFile
        }}>
            <FileInputForm/>
        </NetContext.Provider>
    );
};
export default Nets;
