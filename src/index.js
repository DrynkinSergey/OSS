import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path="/addUser" exact element={<AddUser/>}/>
                <Route path="/editUser/:id" exact element={<EditUser/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
);
