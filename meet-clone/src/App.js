import "./App.css";
import React, { useState } from "react";
import { useAppContext } from "./context/appContext";
import VideoChat from "./VideoChat";
import { Login } from './components/index';

function App() {
  const {appState} = useAppContext();

  return (
    <div className="App">
      {appState === "login" && <Login />}
      {appState === "home" && (
        <main>
          <VideoChat />
        </main>
      )}
    </div>
  );
}

export default App;
