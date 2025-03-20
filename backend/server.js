const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { encryptAES, decryptAES, encrypt3DES, decrypt3DES, encryptOTP, decryptOTP } = require("./encryptor");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/encrypt", (req, res) => {
    const { algorithm, text, key } = req.body;
    let result;
    if (algorithm === "AES") result = encryptAES(text, key);
    else if (algorithm === "3DES") result = encrypt3DES(text, key);
    else if (algorithm === "OTP") result = encryptOTP(text, key);
    res.json({ encrypted: result });
});

app.post("/decrypt", (req, res) => {
    const { algorithm, text, key } = req.body;
    let result;
    if (algorithm === "AES") result = decryptAES(text, key);
    else if (algorithm === "3DES") result = decrypt3DES(text, key);
    else if (algorithm === "OTP") result = decryptOTP(text, key);
    res.json({ decrypted: result });
});

app.listen(5000, () => console.log("Server running on port 5000"));
