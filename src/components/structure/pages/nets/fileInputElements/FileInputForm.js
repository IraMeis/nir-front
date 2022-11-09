import FileCheckField from "./FileCheckField";
import ImageManagmentButtons from "./ImageManagmentButtons";
import ImageVisualField from "./ImageVisualField";
import VideoVisualField from "./VideoVisualField";
import ResultEval from "./ResultEval";
import Separator from "../../../Separator";
import WaitVisualField from "./WaitVisualField";

const FileInputForm = () => {

    return (
        <div className="container">
            <div className="row py-4">
                <div className="col-lg-7 mx-auto">
                    <FileCheckField/>
                    <ImageManagmentButtons/>
                    <WaitVisualField/>
                    <ImageVisualField/>
                    <VideoVisualField/>
                    <Separator.Separator2/>
                    <ResultEval/>
                </div>
            </div>
        </div>
    );
}

export default FileInputForm;