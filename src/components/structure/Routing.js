import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import ErrorPattern from "./pages/ErrorPattern";
import Chmmf from "./pages/matmod/Chmmf";

const Routing = () => {
  return(
      <div className="container mt-3">
          <Routes>
              <Route path="/" element={<About/>} />
              <Route path="/chmmf" element={<Chmmf/>} />
              <Route path="/*" element={<ErrorPattern/>} />
          </Routes>
      </div>
  );
}
export default Routing;
