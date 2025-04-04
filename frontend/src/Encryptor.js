import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Encryptor = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("AES");
  const [encryptedText, setEncryptedText] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/encrypt", {
        message,
        key,
        algorithm,
      });
      setEncryptedText(response.data.encryptedText);
    } catch (err) {
      setError("Encryption failed. Check your inputs.");
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="card">
      <h2>Message Encryption</h2>
      <div className="form-group">
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
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
      <button onClick={handleEncrypt}>Encrypt</button>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Result:</label>
        <textarea value={encryptedText} readOnly />
        <button
          onClick={copyToClipboard}
          disabled={!encryptedText}
          className="copy-btn"
        >
          Copy Encrypted Text
        </button>
      </div>
    </div>
  );
};

export default Encryptor;
