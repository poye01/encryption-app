import React, { useState } from "react";
import axios from "axios";

const Encryptor = () => {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [algorithm, setAlgorithm] = useState("AES");
    const [encryptedText, setEncryptedText] = useState("");

    const handleEncrypt = async () => {
        const response = await axios.post("http://localhost:5000/encrypt", { algorithm, text, key });
        setEncryptedText(response.data.encrypted);
    };

    return (
        <div>
            <h2>Message to Encrypt</h2>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <h3>Encryption Key</h3>
            <input value={key} onChange={(e) => setKey(e.target.value)} />
            <h3>Choose Algorithm</h3>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="AES">AES</option>
                <option value="3DES">3DES</option>
                <option value="OTP">OTP</option>
            </select>
            <button onClick={handleEncrypt}>Encrypt</button>
            <h3>Encrypted Text</h3>
            <textarea readOnly value={encryptedText} />
        </div>
    );
};

export default Encryptor;
