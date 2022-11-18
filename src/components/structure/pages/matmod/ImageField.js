import React, {useContext} from "react";
import ChmmfContext from "../../../context/ChmmfContext";

export default function ImageField() {
    const chmmf = useContext(ChmmfContext)
    const maxDim = 800
    return (
        <div>
            {chmmf.image && (
                <div className="image-area-mm mt-4">
                    <img id="imageResult"
                         src={URL.createObjectURL(chmmf.image)}
                         key={'ind832edje'}
                         alt=""
                         width={maxDim}
                         height={maxDim}
                         className="img-fluid mx-auto d-block"/>
                </div>)
            }
        </div>
    );
}