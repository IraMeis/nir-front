import FileCheckField from "./FileCheckField";
import ImageManagmentButtons from "./ImageManagmentButtons";
import ImageVisualField from "./ImageVisualField";
import VideoVisualField from "./VideoVisualField";

const FileInputForm = () => {

    return (
        <div className="container">
            <div className="row py-4">
                <div className="col-lg-7 mx-auto">
                    <FileCheckField/>
                    <ImageManagmentButtons/>
                    <ImageVisualField/>
                    <VideoVisualField/>
                </div>
            </div>
        </div>
    );
}

export default FileInputForm;