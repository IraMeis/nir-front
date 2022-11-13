import React, {useContext} from "react";
import MatmodContext from "../../../context/MatmodContext";

const StartPlayDelay = () => {
    const matmod = useContext(MatmodContext);
    return (
        <>
            <div className="row">

                <div className="col text-center">
                    <button type="button"
                            onClick={matmod.handleChangeIsEnabled}
                            className="btn btn-outline-secondary m-0 rounded-pill px-4">
                        <i className="fa fa-cloud-upload mr-2 text-muted"/>
                        <small className="text-uppercase font-weight-bold">
                            {matmod.isEnabled ? 'Stop' : 'Start'}
                        </small>
                    </button>
                </div>

                <div className="col text-center">
                    <h3>Requests sended: {matmod.totalAmount}</h3>
                </div>

                <div className="col text-center">
                    <button type="button"
                            onClick={matmod.handleChangeIsRunning}
                            className="btn btn-outline-secondary m-0 rounded-pill px-4">
                        <i className="fa fa-cloud-upload mr-2 text-muted"/>
                        <small className="text-uppercase font-weight-bold">
                            {matmod.isRunning ? 'Pause' : 'Play'}
                        </small>
                    </button>
                </div>

            </div>
            <div className="row">
                <div className="col text-center"/>
                <div className="col text-center"/>
                <div className="col text-center">
                    <label htmlFor="delay">
                        <h5>Delay, ms:</h5>
                    </label>
                    <input
                        className="form-control"
                        type="number"
                        name="delay"
                        onChange={matmod.handleChangeDelay}
                        value={matmod.delay}
                    />
                </div>
                <div className="col text-center"/>
                <div className="col text-center"/>
            </div>
        </>
    );
}

export default StartPlayDelay;