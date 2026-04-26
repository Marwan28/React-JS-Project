import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./Redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Provider } from "react-redux";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);