import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <SpeechProvider appId="d9b6de79-1ef8-48b5-aa3d-1718002b550b" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
