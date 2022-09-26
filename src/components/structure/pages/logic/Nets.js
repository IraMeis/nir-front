import React, {useContext, useState} from "react";
import FileInputForm from "./fileInputElements/FileInputForm";
import NetContext from '../../../context/NetContext';
import models from '../../../../util/netModels.json';
import fileT from '../../../../util/fileType.json';
import UploadService from "../../../../service/run.service";
import ModalContext from "../../../context/ModalContext";
import ModalInfo from "../../modal/ModalInfo";

const Nets = () => {

    const [currentFileURL, setCurrentFileURL] = useState("");

    const [currentSelectedFile, setCurrentSelectedFile] = useState(null);
    const [currentSelectedFileURL, setCurrentSelectedFileURL] = useState("");
    const [currentSelectedFileName, setCurrentSelectedFileName] = useState("");

    const [currentScannedFileURL, setCurrentScannedFileURL] = useState("");

    const [model, setModel] = useState(models[0].label);
    const [fileType, setFileType] = useState(fileT.none)

    const videos = ["mp4", "m4p", "m4v", "mpg", "mpeg", "mp2", "mpe", "mpv",
        "3gp", "ogg", "webm", "avi", "wmv", "mkv", "mov", "webm", "flv"]
    const images = ["jpg", "gif", "png", "jpeg", "webp","raw", "tiff", "bmp", "psd"]

    const selectFile = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);

        const end = String(file.name).split(".").pop().toLowerCase();
        if(videos.indexOf(end) !== -1)
            setFileType(fileT.video)
        else if (images.indexOf(end) !== -1)
            setFileType(fileT.image)
        else
            setFileType(fileT.other)

        setCurrentScannedFileURL("");
        setCurrentFileURL(url);
        setCurrentSelectedFileURL(url);
        setCurrentSelectedFile(file);
        setCurrentSelectedFileName(file.name);
    };

    const clearFile = () => {
        setFileType(fileT.none)
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
            if(fileType === fileT.video)
                UploadService.uploadVideo(currentSelectedFile, String(model))
                    .then((response) => {
                        const url = URL.createObjectURL(response.data);
                        setCurrentFileURL(url);
                        setCurrentScannedFileURL(url);
                    })
                    .catch((err) => {
                        modalContext.setInfoMess(['Something went wrong', err.message]);
                        modalContext.handleShowModalInfo();
                    });
            else if (fileType === fileT.image)
                UploadService.uploadImage(currentSelectedFile, String(model))
                    .then((response) => {
                        const url = URL.createObjectURL(response.data);
                        setCurrentFileURL(url);
                        setCurrentScannedFileURL(url);
                    })
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
            model : model,
            fileType : fileType
        }}>
            <ModalInfo/>
            <FileInputForm/>
        </NetContext.Provider>
    );
};
export default Nets;
