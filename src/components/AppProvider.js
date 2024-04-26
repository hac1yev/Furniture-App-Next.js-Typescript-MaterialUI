"use client";

import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </Provider>
  );
};

export default AppProvider;
