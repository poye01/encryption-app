const CryptoJS = require("crypto-js");

// AES Encryption & Decryption
const encryptAES = (text, key) => CryptoJS.AES.encrypt(text, key).toString();
const decryptAES = (cipher, key) => CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);

// 3DES Encryption & Decryption
const encrypt3DES = (text, key) => CryptoJS.TripleDES.encrypt(text, key).toString();
const decrypt3DES = (cipher, key) => CryptoJS.TripleDES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);

// OTP Encryption & Decryption (Simple XOR-based)
const encryptOTP = (text, key) => {
    return text.split("").map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join("");
};
const decryptOTP = encryptOTP; // OTP decryption is the same as encryption

module.exports = { encryptAES, decryptAES, encrypt3DES, decrypt3DES, encryptOTP, decryptOTP };
