import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import ResultEval from "./ResultEval";
import MapGetCoordinate from "./MapGetCoordinate";
import Separator from "../../../Separator";

const EvalAndSave = () => {
    const netContextEval = useContext(NetContext).currentScannedFileEVAL;
    return (
        <div>
            {netContextEval !== null &&
            (
                <div>
                    <ResultEval/>
                    <Separator.Separator4/>
                </div>)
            }
            <MapGetCoordinate/>
        </div>
    );
}

export default EvalAndSave;