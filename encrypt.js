const fs = require('fs');
const crypto = require('crypto');

// Datei einlesen
const content = fs.readFileSync('content.html', 'utf8');

// AES‑256‑GCM Schlüssel erzeugen
const key = crypto.randomBytes(32); // 256 Bit
const iv = crypto.randomBytes(12);  // 96 Bit für GCM

const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
let encrypted = cipher.update(content, 'utf8', 'base64');
encrypted += cipher.final('base64');
const tag = cipher.getAuthTag().toString('base64');

// content.enc speichern
fs.writeFileSync('content.enc', JSON.stringify({
    iv: iv.toString('base64'),
    tag: tag,
    data: encrypted
}, null, 2));

// Schlüssel speichern
fs.writeFileSync('key.txt', key.toString('base64'));

console.log('Verschlüsselung abgeschlossen.');
console.log('content.enc und key.txt wurden erzeugt.');
