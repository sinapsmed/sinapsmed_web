import CryptoJS from 'crypto-js';
import { cookieKey } from './keys';

export const encryptValue = (value: string) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(value, cookieKey).toString();    
    return encrypted;
  } catch (error) {
    console.error('Error encrypting value:', error);
    return undefined;
  }
};

export const decryptValue = (encryptedValue: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, cookieKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error('Error decrypting value:', error);
    return undefined;
  }
};
