import { useState } from "react";
import {
  decryptWithPassword,
  encryptWithPassword,
  type EncryptedPayload,
} from "./utils";

const Encrypt = () => {
  const [plainText, setPlainText] = useState("hello world");
  const [password, setPassword] = useState("111111");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [payload, setPayload] = useState<EncryptedPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEncrypt = async () => {
    try {
      setErrorMessage("");
      const nextPayload = await encryptWithPassword(plainText, password);
      setPayload(nextPayload);
      setEncryptedText(nextPayload.ciphertext);
      setDecryptedText("");
    } catch (error) {
      console.error(error);
      setErrorMessage("加密失败，请稍后重试。");
    }
  };

  const handleDecrypt = async () => {
    if (!payload) {
      setErrorMessage("请先执行一次加密，再进行解密。");
      return;
    }

    try {
      setErrorMessage("");
      const nextDecryptedText = await decryptWithPassword(payload, password);
      setDecryptedText(nextDecryptedText);
    } catch (error) {
      console.error(error);
      setErrorMessage("解密失败，请确认密码和密文参数是否一致。");
      setDecryptedText("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 md:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-indigo-900/20 backdrop-blur md:p-10">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Encrypt Demo
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Encrypt Page 请打开控制台查看效果
        </p>
        {errorMessage ? (
          <p className="mt-3 rounded-lg border border-rose-300/30 bg-rose-500/15 px-3 py-2 text-sm text-rose-100">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-8 grid gap-6">
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            请输入原文
            <input
              className="h-11 rounded-xl border border-white/15 bg-slate-800/80 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="请输入需要加密的文本"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-200">
            请输入密码
            <input
              className="h-11 rounded-xl border border-white/15 bg-slate-800/80 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入用于加解密的密码"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={handleEncrypt}
              className="inline-flex h-10 items-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              加密
            </button>
            <button
              onClick={handleDecrypt}
              className="inline-flex h-10 items-center rounded-lg border border-white/20 bg-slate-800 px-4 text-sm font-medium text-slate-100 transition hover:border-indigo-300/40 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              解密
            </button>
          </div>

          <div className="grid gap-4 pt-2 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                加密结果
              </p>
              <p className="mt-2 break-all text-sm text-slate-200">
                {encryptedText || "暂未生成加密文本"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                解密结果
              </p>
              <p className="mt-2 break-all text-sm text-slate-200">
                {decryptedText || "暂未生成解密文本"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <p className="mt-4 text-xs text-slate-400">
          提示：当前示例会保存解密所需参数（salt、iv、iterations
          等）并使用密码重新派生密钥。
        </p>
      </div>
    </main>
  );
};

export default Encrypt;
