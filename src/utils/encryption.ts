import forge from 'node-forge';

/**
 * Encrypts a string using RSA public key encryption
 * @param data - The string to encrypt
 * @param publicKeyPem - The public key in PEM format
 * @returns Base64 encoded encrypted string
 */
export const encryptWithPublicKey = (data: string, publicKeyPem: string): string => {
  try {
    // Parse the public key from PEM format
    console.log(publicKeyPem)
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    
    // Encrypt the data

    const encrypted = publicKey.encrypt(data, 'RSA-OAEP');
    
    // Return base64 encoded encrypted data
    return forge.util.encode64(encrypted);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt API key');
  }
};

/**
 * Gets the public key from environment variables
 * @returns The public key string or null if not found
 */
export const getPublicKey = (): string | null => {
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('VITE_PUBLIC_KEY not found in environment variables');
    return null;
  }
  
  return publicKey;
};

/**
 * Encrypts an API key using the public key from environment variables
 * @param apiKey - The API key to encrypt
 * @returns Base64 encoded encrypted API key or the original key if encryption fails
 */
export const encryptApiKey = (apiKey: string): string => {
  if (!apiKey || apiKey.trim() === '') {
    return apiKey;
  }
  
  try {
    const publicKey = getPublicKey();
    
    if (!publicKey) {
      console.warn('No public key available, sending API key unencrypted');
      return apiKey;
    }
    
    return encryptWithPublicKey(apiKey, publicKey);
  } catch (error) {
    console.error('Failed to encrypt API key:', error);
    console.warn('Sending API key unencrypted due to encryption failure');
    return apiKey;
  }
};