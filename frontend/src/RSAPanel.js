import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const RSAPanel = () => {
  const [rsaMessage, setRsaMessage] = useState("");
  const [rsaEncrypted, setRsaEncrypted] = useState("");
  const [rsaDecrypted, setRsaDecrypted] = useState("");
  const [error, setError] = useState("");

  const handleRsaEncrypt = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/rsa-encrypt", {
        message: rsaMessage,
      });
      setRsaEncrypted(response.data.encryptedText);
    } catch (err) {
      setError("RSA Encryption failed");
      console.error(err);
    }
  };

  const handleRsaDecrypt = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/rsa-decrypt", {
        encryptedText: rsaEncrypted,
      });
      setRsaDecrypted(response.data.decryptedText);
    } catch (err) {
      setError("RSA Decryption failed");
      console.error(err);
    }
  };

  const copyRsaToClipboard = () => {
    navigator.clipboard.writeText(rsaEncrypted);
    alert("Copied to clipboard!");
  };

  const pasteRsaFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRsaEncrypted(text);
    } catch (err) {
      alert("Failed to read from clipboard");
      console.error(err);
    }
  };

  return (
    <div className="rsa-panel">
      <h2>RSA Encryption/Decryption</h2>
      <div className="form-group">
        <label>Message:</label>
        <textarea
          value={rsaMessage}
          onChange={(e) => setRsaMessage(e.target.value)}
        />
      </div>
      <button onClick={handleRsaEncrypt}>RSA Encrypt</button>
      <div className="form-group">
        <label>Encrypted:</label>
        <textarea value={rsaEncrypted} readOnly />
        <button
          onClick={copyRsaToClipboard}
          disabled={!rsaEncrypted}
          className="copy-btn"
        >
          Copy RSA Encrypted Text
        </button>
      </div>
      <div className="form-group">
        <label>Encrypted Message:</label>
        <textarea
          value={rsaEncrypted}
          onChange={(e) => setRsaEncrypted(e.target.value)}
        />
        <button onClick={pasteRsaFromClipboard} className="paste-btn">
          Paste RSA Encrypted Text
        </button>
      </div>
      <button onClick={handleRsaDecrypt}>RSA Decrypt</button>
      <div className="form-group">
        <label>Decrypted:</label>
        <textarea value={rsaDecrypted} readOnly />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default RSAPanel;
