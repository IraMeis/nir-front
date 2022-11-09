import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import ErrorPattern from "./pages/ErrorPattern";
import Nets from "./pages/nets/Nets";
import Matmod from "./pages/matmod/Matmod";

const Routing = () => {
  return(
      <div className="container mt-3">
          <Routes>
              <Route path="/" element={<About/>} />
              <Route path="/nets" element={<Nets/>} />
              <Route path="/matmod" element={<Matmod/>} />
              <Route path="/*" element={<ErrorPattern/>} />
          </Routes>
      </div>
  );
}
export default Routing;
