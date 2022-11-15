import React, {useContext} from "react";
import MatmodContext from "../../../context/MatmodContext";
import Separator from "../../Separator";
import MatmodBorderFileInput from "./MatmodBorderFileInput";
import MatmodFileInput from "./MatmodFileInput";
import StartPlayDelay from "./StartPlayDelay";

export default function MainConfig () {
    const maxDim = 800
    const matmod = useContext(MatmodContext);
    return (
        <>
            <MatmodBorderFileInput/>
            <MatmodFileInput/>
            <Separator.Separator2/>
            <StartPlayDelay/>
            {matmod.imagesInitFiles.map((imgSrc, index) => (
                <div className="image-area-mm mt-4">
                    <img id="imageResult"
                         src={URL.createObjectURL(imgSrc)}
                         key={index}
                         alt=""
                         width={maxDim}
                         height={maxDim}
                         className="img-fluid mx-auto d-block"/>
                </div>))
            }
            {matmod.images.map((imgSrc, index) => (
                <div className="image-area-mm mt-4">
                    <img id="imageResult"
                         src={imgSrc}
                         key={index}
                         alt=""
                         className="img-fluid mx-auto d-block"/>
                </div>))
            }
        </>
    );
}