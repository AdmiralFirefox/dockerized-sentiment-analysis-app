"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

type ReduxProvider = {
  children: React.ReactNode;
};

const persistor = persistStore(store);

const ReduxProvider = ({ children }: ReduxProvider) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
