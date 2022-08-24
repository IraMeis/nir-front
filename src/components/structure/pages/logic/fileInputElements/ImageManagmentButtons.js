import clear from "../../../../../icons/clear.png";
import refresh from "../../../../../icons/refresh.png";
import start from "../../../../../icons/start.png";
import {useContext} from "react";
import NetContext from "../../../../context/NetContext";

const ImageManagmentButtons = () => {
    const netContext = useContext(NetContext);
    return (
        <div className="row">

            <div className="col text-center">
                <button type="button"
                        onClick={netContext.clearFile}
                        className="btn btn-outline-warning btn-circle-img">
                    <img className="rounded mx-auto d-block img-fluid"
                         src={clear}
                         alt=""/>
                </button>
            </div>

            <div className="col text-center">
                <button type="button"
                        onClick={netContext.rollbackFile}
                        className="btn btn-outline-secondary m-0 btn-circle-img">
                    <img className="rounded mx-auto d-block img-fluid"
                         src={refresh}
                         alt=""/>
                </button>
            </div>

            <div className="col text-center">
                <button type="button"
                        onClick={netContext.changeModel}
                        className="btn btn-outline-secondary m-0 rounded-pill px-4">
                    <i className="fa fa-cloud-upload mr-2 text-muted"/>
                    <small className="text-uppercase font-weight-bold">
                        {netContext.model}
                    </small>
                </button>
            </div>

            <div className="col text-center">
                <button type="button"
                        className="btn btn-outline-warning btn-circle-img btn-circle-img-start">
                    <img className="rounded mx-auto d-block img-fluid"
                         src={start}
                         alt=""/>
                </button>
            </div>

        </div>
    );
}

export default ImageManagmentButtons;