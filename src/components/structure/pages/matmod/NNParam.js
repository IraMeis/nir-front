import React, {useContext} from "react";
import MatmodContext from "../../../context/MatmodContext";
import Separator from "../../Separator";

const NNParam = () => {
    const matmod = useContext(MatmodContext);
    return (
        <div className="row">
            <div className="col"/>
            <div className="col"/>
            <div className="col text-center">
                <label><h5>{'N:'}</h5></label>
                <input
                    className="form-control"
                    type="number"
                    name={'NN'}
                    disabled={matmod.isNNSet}
                    value={matmod.NN}
                    onChange={matmod.handleChangeNN}/>
                <Separator.Separator1/>
                <button type="button"
                        onClick={matmod.handleChangeIsNNSet}
                        className="btn btn-outline-secondary m-0 rounded-pill px-4">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <small className="text-uppercase font-weight-bold">
                        {matmod.isNNSet ?  'Reset' : 'Ok'}
                    </small>
                </button>
            </div>
            <div className="col"/>
            <div className="col"/>
        </div>
    );
}

export default NNParam;