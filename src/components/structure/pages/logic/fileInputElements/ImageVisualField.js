import {useContext} from "react";
import NetContext from "../../../../context/NetContext";

const ImageVisualField = () => {
  const netContext = useContext(NetContext);
  return (
      <div className="image-area mt-4">
          <img id="imageResult"
               src={netContext.currentFileURL}
               alt=""
               className="img-fluid rounded shadow-sm mx-auto d-block"/>
      </div>
  );
}

export default ImageVisualField;