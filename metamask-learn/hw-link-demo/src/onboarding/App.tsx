import React, { useState, useEffect, useRef } from 'react';
import './app.scss';
import { listen } from '@ledgerhq/logs';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import Eth from '@ledgerhq/hw-app-eth';

const App = () => {
  const [walletInfo, setWalletInfo] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleConnect = async () => {
    try {
      // 初始化底层通讯
      const transport = await TransportWebHID.create();

      // 初始化 ethApp
      const ethApp = new Eth(transport);

      // 连接
      const data = await ethApp.getAddress("44'/60'/0'/0/0", false, true);

      setWalletInfo(JSON.stringify(data, null, 4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listen((log) => console.log(log));
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleConnect);
    }
  }, []);

  return (
    <div>
      <button type="button" ref={buttonRef} onClick={handleConnect}>Click Me to Connect Ledger</button>
      <pre> { walletInfo || 'hi man there is nothing ~' } </pre>
    </div>
  );
};

export default App;
