import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import fileT from "../../../../../util/fileType.json";

const VideoVisualField = () => {
    const netContext = useContext(NetContext);
    return (<div>
            {netContext.fileType === fileT.video
                &&
                <div>
                    <div className="video-area mt-4">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe src={netContext.currentFileURL}
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default VideoVisualField;