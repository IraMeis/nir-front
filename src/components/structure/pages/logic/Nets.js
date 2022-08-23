import Separator from "../../Separator";
import React, {useState} from "react";
import {Image} from "react-bootstrap";

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

        <div className="container">

            <Separator.Separator1/>

            <label>
                {/*<div> {"Максимальный размер файла 128 Кб."}</div>*/}
                {/*<div>{"Ожидаемый формат JSON."}</div>*/}
            </label>

            <div className="input-group">
                <div className="input-group-prepend">
                </div>
                <div className="custom-file">
                    <input
                        type="file"
                        onChange={selectFile}
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        {currentFileName}
                    </label>
                </div>
            </div>

            <Separator.Separator3/>

            <div className="text-center">
                <Image src={currentFileURL}
                       className="rounded mx-auto d-block img-fluid"
                       alt="image not set"/>
            </div>

            <Separator.Separator3/>

        </div>
    );
};
export default Nets;
