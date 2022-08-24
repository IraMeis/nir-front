import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import ErrorPattern from "./pages/ErrorPattern";
import ModalWrapper from "./pages/logic/ModalWrapper";

const Routing = () => {
  return(
      <div className="container mt-3">
          <Routes>
              <Route path="/" element={<About/>} />
              <Route path="/nets" element={<ModalWrapper/>} />
              <Route path="/*" element={<ErrorPattern/>} />
          </Routes>
      </div>
  );
}
export default Routing;
