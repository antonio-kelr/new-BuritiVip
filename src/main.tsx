import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "primereact/resources/themes/saga-blue/theme.css";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import 'primereact/resources/primereact.min.css';
import "primeflex/primeflex.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import { PrimeReactProvider } from 'primereact/api';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App></App>
    </PrimeReactProvider>
  </React.StrictMode>
);


