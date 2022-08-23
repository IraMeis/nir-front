import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/structure/NavBar";
import Routing from "./components/structure/Routing";

const App = () => {

  return (
    <div>
        <NavBar/>
        <Routing/>
    </div>
  );
};

export default App;
