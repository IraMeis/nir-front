import React, {useState} from "react";
import FileInputForm from "./FileInputForm";

const Nets = () => {

    const [currentFile, setCurrentFile] = useState();
    const [currentFileURL, setCurrentFileURL] = useState();
    const [currentFileName, setCurrentFileName] = useState("");

    const selectFile = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setCurrentFileURL(url);
        setCurrentFile(file);
        setCurrentFileName(file.name);
    };

    return (
        <FileInputForm selectFile={selectFile}
                       fileUrl={currentFileURL}
                       fileName={currentFileName}/>
    );
};
export default Nets;
