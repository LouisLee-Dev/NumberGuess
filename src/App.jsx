import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MathEquationMode from "./pages/MathEquationMode";
import MathWorldleUnlimited from "./pages/MathWorldleUnlimited";
import NumberOnlyMode from "./pages/NumberOnlyMode";
import store from "./store";

function App() {
  const currentUrl = window.location.href;
  if (currentUrl.includes("math-wordle-unlimited")) {
    store.dispatch({
      type: "dailyChallengeMode",
      payload: false,
    });
    store.dispatch({
      type: "practiceMode",
      payload: true,
    });
    store.dispatch({
      type: "numbersOnlyMode",
      payload: false,
    });
  }
  if (currentUrl.includes("guess-the-numbers")) {
    store.dispatch({
      type: "dailyChallengeMode",
      payload: false,
    });
    store.dispatch({
      type: "numbersOnlyMode",
      payload: true,
    });
    store.dispatch({
      type: "practiceMode",
      payload: false,
    });
  }
  const [settings, setSettings] = useState({
    colorBlind: false,
    darkMode: false,
    challengeLink: window.location.pathname.includes("/challenge")
      ? window.location.pathname.split("/challenge/")[1]
      : null,
  });

  store.subscribe(() => {
    if (store.getState().darkMode !== settings.darkMode) {
      setSettings({
        darkMode: store.getState().darkMode,
      });
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={<MathEquationMode challengeLink={settings.challengeLink} />}
        />
        <Route
          path="/guess-the-numbers"
          element={<NumberOnlyMode challengeLink={settings.challengeLink} />}
        />
        <Route
          path="/math-wordle-unlimited"
          element={
            <MathWorldleUnlimited challengeLink={settings.challengeLink} />
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <MathWorldleUnlimited challengeLink={settings.challengeLink} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
