import CryptoJS from "crypto-js";
import { useRef } from "react";

function useEncryptedText(token: string, key: string): string {
  const encryptedTextRef = useRef<{ token: string; key: string; encryptedText: string }>({
    token: "",
    key: "",
    encryptedText: "",
  });

  if (token !== encryptedTextRef.current.token || key !== encryptedTextRef.current.key) {
    encryptedTextRef.current.token = token;
    encryptedTextRef.current.key = key;
    encryptedTextRef.current.encryptedText = CryptoJS.AES.encrypt(token, key).toString();
  }

  return encryptedTextRef.current.encryptedText;
}

export default useEncryptedText;