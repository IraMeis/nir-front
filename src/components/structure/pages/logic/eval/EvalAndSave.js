import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import ResultEval from "./ResultEval";
import MapGetCoordinate from "./MapGetCoordinate";
import Separator from "../../../Separator";
import SaveButtons from "./SaveButtons";

const EvalAndSave = () => {
    const netContextEval = useContext(NetContext).currentScannedFileEVAL;
    return (
        <div>
            {netContextEval !== null &&
            (
                <div>
                    <ResultEval/>
                    <Separator.Separator2/>
                    <MapGetCoordinate/>
                    <Separator.Separator2/>
                    <SaveButtons/>
                    <Separator.Separator2/>
                </div>)
            }
        </div>
    );
}

export default EvalAndSave;