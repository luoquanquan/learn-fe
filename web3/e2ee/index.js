const crypto = require("crypto");
const secp = require("@noble/secp256k1");

// 获取公私钥对
function generateKeyPair() {
  const privateKey = secp.utils.randomPrivateKey();
  // 此处要使用非压缩公钥
  const publicKey = secp.getPublicKey(privateKey, false);
  return { privateKey, publicKey };
}

// 计算共享密钥
function deriveSharedKey(privateKey, otherPublicKey) {
  const sharedSecret = secp.getSharedSecret(privateKey, otherPublicKey, false); // 65 bytes
  // 取后 32 字节
  const sharedKey = crypto
    .createHash("sha256")
    .update(sharedSecret.slice(1))
    .digest(); // 32 bytes

  return sharedKey;
}

// 加密
function encryptMessage(sharedKey, message) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", sharedKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(message, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return { iv, encrypted, tag };
}

// 解密
function decryptMessage(sharedKey, { iv, encrypted, tag }) {
  const decipher = crypto.createDecipheriv("aes-256-gcm", sharedKey, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString();
}

const alice = generateKeyPair();
const bob = generateKeyPair();

// Alice & Bob 各自生成共享密钥
const aliceSharedKey = deriveSharedKey(alice.privateKey, bob.publicKey);
const bobSharedKey = deriveSharedKey(bob.privateKey, alice.publicKey);

console.log(
  `Current log: aliceSharedKey.toString("hex"): `,
  aliceSharedKey.toString("hex")
);
console.log(
  `Current log: bobSharedKey.toString("hex"): `,
  bobSharedKey.toString("hex")
);
// 两个人生成的共享密钥应该是一样的
console.log(
  `Current log: equal: `,
  aliceSharedKey.toString("hex") === bobSharedKey.toString("hex")
);

// bob 发消息给 alice
const bobSay = "Hello Alice";
const bobSayEncrypted = encryptMessage(bobSharedKey, bobSay);

// alice 解密消息
const bobSayDecrypted = decryptMessage(aliceSharedKey, bobSayEncrypted);
console.log("Alice heard bobSayDecrypted:", bobSayDecrypted);

// alice 发消息给 bob
const aliceSay = "Hi Bob";
const aliceSayEncrypted = encryptMessage(aliceSharedKey, aliceSay);

// bob 解密消息
const aliceSayDecrypted = decryptMessage(bobSharedKey, aliceSayEncrypted);
console.log("Bob heard aliceSayDecrypted:", aliceSayDecrypted);
