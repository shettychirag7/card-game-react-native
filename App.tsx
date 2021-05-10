import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import CardGame from "./screens/CardGame";

export default function App() {
  return (
    <Provider store={store()}>
      <CardGame />
    </Provider>
  );
}
