import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import ErrorPattern from "./pages/ErrorPattern";
import Nets from "./pages/logic/Nets";
import Results from "./pages/logic/Results";

const Routing = () => {
  return(
      <div className="container mt-3">
          <Routes>
              <Route path="/" element={<About/>} />
              <Route path="/nets" element={<Nets/>} />
              <Route path="/results" element={<Results/>} />
              <Route path="/*" element={<ErrorPattern/>} />
          </Routes>
      </div>
  );
}
export default Routing;
