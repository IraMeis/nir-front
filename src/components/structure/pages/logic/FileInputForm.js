import refresh from '../../../../icons/refresh.png';
import clear from '../../../../icons/clear.png';
import start from '../../../../icons/start.png';

const FileInputForm = ({selectFile, fileName, fileUrl}) => {

    return (
        <div className="container">
            <div className="row py-4">
                <div className="col-lg-7 mx-auto">

                    <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                        <input id="upload"
                               type="file"
                               onChange={selectFile}
                               className="form-control border-0"/>
                        <label id="upload-label"
                               htmlFor="upload"
                               className="font-weight-light text-muted">
                            {fileName}
                        </label>

                        <div className="input-group-append">
                            <label htmlFor="upload"
                                   className="btn btn-warning m-0 rounded-pill px-4">
                                <i className="fa fa-cloud-upload mr-2 text-muted"/>
                                <small className="text-uppercase font-weight-bold text-muted">
                                    Choose file
                                </small>
                            </label>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <button type="button" className="btn btn-outline-warning btn-circle-img">
                                <img className="rounded mx-auto d-block img-fluid"
                                    src={clear}
                                    alt=""/>
                            </button>
                        </div>
                        <div className="col text-center">
                            <button type="button" className="btn btn-outline-secondary m-0 btn-circle-img">
                                <img className="rounded mx-auto d-block img-fluid"
                                    src={refresh}
                                    alt=""/>
                            </button>
                        </div>
                        <div className="col text-center">
                            <button className="btn btn-outline-secondary m-0 rounded-pill px-4">
                                <i className="fa fa-cloud-upload mr-2 text-muted"/>
                                <small className="text-uppercase font-weight-bold">
                                    model
                                </small>
                            </button>
                        </div>
                        <div className="col text-center">
                            <button type="button" className="btn btn-outline-warning btn-circle-img btn-circle-img-start">
                                <img className="rounded mx-auto d-block img-fluid"
                                    src={start}
                                    alt=""/>
                            </button>
                        </div>
                    </div>

                    <div className="image-area mt-4">
                        <img id="imageResult"
                             src={fileUrl}
                             alt=""
                             className="img-fluid rounded shadow-sm mx-auto d-block"/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FileInputForm;