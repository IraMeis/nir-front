import {useContext} from "react";
import NetContext from "../../../../context/NetContext";
import fileT from "../../../../../util/fileType.json";

const ImageVisualField = () => {
  const netContext = useContext(NetContext);
  return (<div>
      {netContext.fileType !== fileT.video &&
          <div className="image-area mt-4">
              <img id="imageResult"
                   src={netContext.currentFileURL}
                   alt=""
                   className="img-fluid rounded shadow-sm mx-auto d-block"/>
          </div>}
  </div>);
}

export default ImageVisualField;