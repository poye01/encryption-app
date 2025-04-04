const CryptoJS = require("crypto-js");

// AES Encryption
const encryptAES = (text, key) => CryptoJS.AES.encrypt(text, key).toString();
const decryptAES = (cipher, key) => {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// 3DES Encryption
const encrypt3DES = (text, key) =>
  CryptoJS.TripleDES.encrypt(text, key).toString();
const decrypt3DES = (cipher, key) => {
  const bytes = CryptoJS.TripleDES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// OTP Encryption
const encryptOTP = (text, key) => {
  return text
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    )
    .join("");
};
const decryptOTP = encryptOTP;

module.exports = {
  encryptAES,
  decryptAES,
  encrypt3DES,
  decrypt3DES,
  encryptOTP,
  decryptOTP,
};
