import './App.css';
import Navbar from "./components/Navbar";
import CourtCosts from "./components/CourtCosts";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
      <>
        <Provider store={store}>
            <Navbar/>
            <CourtCosts/>
        </Provider>
      </>
  );
}

export default App;
