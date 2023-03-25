import {useContext} from "react";
import NetContext from "../../../../context/NetContext";

const ResultEval = () => {
    const netContextEval = useContext(NetContext).currentScannedFileEVAL;
    return (
        <div className="row">
            <div className="col "/>
            <div className="col ">
                <button className="btn btn-outline-dark m-0 btn-block disabled">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <p className="text-uppercase font-weight-bold">
                        <h4>Total: {netContextEval.ALL}</h4>
                        <h5>D00: {netContextEval.D00}</h5>
                        <h5>D10: {netContextEval.D10}</h5>
                        <h5>D20: {netContextEval.D20}</h5>
                        <h5>D40: {netContextEval.D40}</h5>
                    </p>
                </button>
            </div>
            <div className="col "/>
        </div>
    );
}

export default ResultEval;