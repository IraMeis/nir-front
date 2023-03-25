import FileCheckField from "./FileCheckField";
import ImageManagmentButtons from "./ImageManagmentButtons";
import ImageVisualField from "./ImageVisualField";
import VideoVisualField from "./VideoVisualField";
import Separator from "../../../Separator";
import WaitVisualField from "./WaitVisualField";
import EvalAndSave from "../eval/EvalAndSave";

const FileInputForm = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <FileCheckField/>
                    <ImageManagmentButtons/>
                    <WaitVisualField/>
                    <ImageVisualField/>
                    <VideoVisualField/>
                    <Separator.Separator2/>
                    <EvalAndSave/>
                </div>
            </div>
        </div>
    );
}

export default FileInputForm;