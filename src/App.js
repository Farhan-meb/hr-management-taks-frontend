import Home from "./pages/home/Home.jsx";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <Router>
            <div className="flex">
                <div style={{ width: "300px" }}>
                    <Sidebar />
                </div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/add-employee" exact component={AddEmployee} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
