import './App.css';
import Navbar from "./components/Navbar";
import {Provider} from "react-redux";
import store from "./redux/store";
import InterestLateness from "./components/InterestLateness";
import TravelCosts from "./components/TravelCosts";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
            <Provider store={store}>
                <Navbar/>
                <Routes>
                    <Route exact path={'/'} element={<TravelCosts/>}/>
                    <Route exact path={'/lateness'} element={<InterestLateness/>}/>
                </Routes>
            </Provider>
    );
}

export default App;
