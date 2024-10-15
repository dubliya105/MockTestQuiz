import React, { useState } from "react";
import crypto from "crypto";

const algorithm = "aes-256-cbc"; // Algorithm for encryption
const secretKey = "your-secret-key-should-be-32-chars"; // Must be 32 characters for AES-256
const iv = crypto.randomBytes(16); // Initialization vector (should be unique for each encryption)

const Password = () => {
  const [password, setPassword] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");

  // Function to encrypt the password
  const handleEncrypt = () => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    // Concatenate the iv and encrypted data for decryption later
    const encryptedData = `${iv.toString("hex")}:${encrypted}`;
    setEncryptedPassword(encryptedData);
  };

  // Function to decrypt the password
  const handleDecrypt = () => {
    const [ivHex, encrypted] = encryptedPassword.split(":");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(ivHex, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    setDecryptedPassword(decrypted);
  };

  return (
    <div>
      <h2>Password Encryption/Decryption with Native Crypto</h2>

      <input
        type="password"
        placeholder="Enter password to encrypt"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEncrypt}>Encrypt Password</button>

      {encryptedPassword && (
        <div>
          <p>Encrypted Password: {encryptedPassword}</p>
          <button onClick={handleDecrypt}>Decrypt Password</button>
        </div>
      )}

      {decryptedPassword && (
        <div>
          <p>Decrypted Password: {decryptedPassword}</p>
        </div>
      )}
    </div>
  );
};

export default Password;
