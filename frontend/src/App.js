import React from "react";
import Encryptor from "./Encryptor";
import Decryptor from "./Decryptor";
import RSAPanel from "./RSAPanel";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Encryption/Decryption App</h1>
      </header>
      <div className="main-grid">
        <Encryptor />
        <Decryptor />
      </div>
      <RSAPanel />
    </div>
  );
}

export default App;
