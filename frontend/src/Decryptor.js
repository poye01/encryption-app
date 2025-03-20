import React, { useState } from "react";
import axios from "axios";

const Decryptor = () => {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [algorithm, setAlgorithm] = useState("AES");
    const [decryptedText, setDecryptedText] = useState("");

    const handleDecrypt = async () => {
        const response = await axios.post("http://localhost:5000/decrypt", { algorithm, text, key });
        setDecryptedText(response.data.decrypted);
    };

    return (
        <div>
            <h2>Message to Decrypt</h2>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <h3>Decryption Key</h3>
            <input value={key} onChange={(e) => setKey(e.target.value)} />
            <h3>Choose Algorithm</h3>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="AES">AES</option>
                <option value="3DES">3DES</option>
                <option value="OTP">OTP</option>
            </select>
            <button onClick={handleDecrypt}>Decrypt</button>
            <h3>Decrypted Text</h3>
            <textarea readOnly value={decryptedText} />
        </div>
    );
};

export default Decryptor;
