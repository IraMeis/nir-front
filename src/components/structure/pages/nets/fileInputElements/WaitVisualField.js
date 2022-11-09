import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import fileT from "../../../../../util/fileType.json";
import wait from "../../../../../icons/infload.gif";

const WaitVisualField = () => {
    const netContext = useContext(NetContext);
    return (<div>
        {netContext.fileType === fileT.wait &&
        <div className="mt-4">
            <img className="rounded mx-auto d-block img-fluid"
                 src={wait}
                 alt=""/>
        </div>}
    </div>);
}

export default WaitVisualField;