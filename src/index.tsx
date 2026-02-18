import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import "@/styles/reuseable.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./appolo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
