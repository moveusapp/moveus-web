import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import "@/styles/reuseable.css";
import App from "@/App";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/apollo/client";
import { UserProvider } from "@/context/profile-context";
import { ToastProvider } from "@/context/toast-context";
import { LanguageProvider } from "@/context/language-context";
import { getStoredLocale, loadLocale } from "@/translations/strings";

void loadLocale(getStoredLocale()).then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );
  root.render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <LanguageProvider>
          <ToastProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ToastProvider>
        </LanguageProvider>
      </ApolloProvider>
    </React.StrictMode>,
  );
});
