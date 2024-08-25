export const generateCodeChallenge = async (verifier) => {
   const encoder = new TextEncoder();
   const data = encoder.encode(verifier);
   const digest = await window.crypto.subtle.digest('SHA-256', data);
   return btoa(String.fromCharCode(...new Uint8Array(digest)))
   .replace(/=/g, '')
   .replace(/\+/g, '-')
   .replace(/\//g, '_');
}