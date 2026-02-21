import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import "@/styles/reuseable.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./appolo/client";
import { UserProvider } from "./context/profile-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
