import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './style/style.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter>
    <RouterCustom/>
</BrowserRouter>);
