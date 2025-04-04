const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const {
  encryptAES,
  decryptAES,
  encrypt3DES,
  decrypt3DES,
  encryptOTP,
  decryptOTP,
} = require("./encryptor");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Existing encryption routes
app.post("/encrypt", (req, res) => {
  const { message, key, algorithm } = req.body;
  try {
    let encryptedText;
    switch (algorithm) {
      case "AES":
        encryptedText = encryptAES(message, key);
        break;
      case "3DES":
        encryptedText = encrypt3DES(message, key);
        break;
      case "OTP":
        encryptedText = encryptOTP(message, key);
        break;
      default:
        return res.status(400).json({ error: "Invalid algorithm" });
    }
    res.json({ encryptedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/decrypt", (req, res) => {
  const { encryptedText, key, algorithm } = req.body;
  try {
    let decryptedText;
    switch (algorithm) {
      case "AES":
        decryptedText = decryptAES(encryptedText, key);
        break;
      case "3DES":
        decryptedText = decrypt3DES(encryptedText, key);
        break;
      case "OTP":
        decryptedText = decryptOTP(encryptedText, key);
        break;
      default:
        return res.status(400).json({ error: "Invalid algorithm" });
    }
    res.json({ decryptedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RSA Routes
app.post("/rsa-encrypt", (req, res) => {
  const { message } = req.body;
  try {
    const encrypted = crypto.publicEncrypt(
      {
        key: fs.readFileSync("public_key.pem", "utf8"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(message, "utf8")
    );
    res.json({ encryptedText: encrypted.toString("base64") });
  } catch (error) {
    res.status(500).json({ error: "RSA encryption failed" });
  }
});

app.post("/rsa-decrypt", (req, res) => {
  const { encryptedText } = req.body;
  try {
    const decrypted = crypto.privateDecrypt(
      {
        key: fs.readFileSync("private_key.pem", "utf8"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(encryptedText, "base64")
    );
    res.json({ decryptedText: decrypted.toString("utf8") });
  } catch (error) {
    res.status(500).json({ error: "RSA decryption failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
