import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Decryptor = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("AES");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");

  const handleDecrypt = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/decrypt", {
        encryptedText,
        key,
        algorithm,
      });
      setDecryptedText(response.data.decryptedText);
    } catch (err) {
      setError("Decryption failed. Check your inputs.");
      console.error(err);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEncryptedText(text);
    } catch (err) {
      alert("Failed to read from clipboard");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Message Decryption</h2>
      <div className="form-group">
        <label>Encrypted Message:</label>
        <textarea
          value={encryptedText}
          onChange={(e) => setEncryptedText(e.target.value)}
        />
        <button onClick={pasteFromClipboard} className="paste-btn">
          Paste Encrypted Text
        </button>
      </div>
      <div className="form-group">
        <label>Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="AES">AES</option>
          <option value="3DES">3DES</option>
          <option value="OTP">One-Time Pad</option>
        </select>
      </div>
      <button onClick={handleDecrypt}>Decrypt</button>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Result:</label>
        <textarea value={decryptedText} readOnly />
      </div>
    </div>
  );
};

export default Decryptor;
