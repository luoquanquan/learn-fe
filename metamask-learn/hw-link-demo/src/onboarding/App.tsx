import React, { useEffect, useRef, useState } from 'react';
import './app.scss';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import Eth from '@ledgerhq/hw-app-eth';
import Btc from '@ledgerhq/hw-app-btc';
import Solana from '@ledgerhq/hw-app-solana'
import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRScanner} from "@keystonehq/animated-qr"


const App = () => {
  const transportRef: any = useRef();
  useEffect(() => {
    (async () => {
      transportRef.current = await TransportWebHID.create();
    })();
  }, []);

  const getEth = async () => {
    try {
      // 初始化 ethApp
      const ethApp = new Eth(transportRef.current);

      // 连接
      const data = await ethApp.getAddress("44'/60'/0'/0/0", false, true);

      console.log(JSON.stringify(data, null, 4));
    } catch (error) {
      console.log(error);
    }
  };

  const generateBtcPath = (i: number) => {
    return {
      legacy: {
        path: `m/44'/0'/0'/0/${i}`,
        format: 'legacy',
      },
      segwit_nested_49: {
        path: `m/49'/0'/0'/0/${i}`,
        format: 'p2sh',
      },
      segwit_native: {
        path: `m/84'/0'/0'/0/${i}`,
        format: 'bech32',
      },
      segwit_taproot: {
        path: `86'/0'/0'/0/${i}`,
        format: 'bech32m',
      },
    };
  };

  const getBtc = async () => {
    console.log(`Current timestamp ${Date.now()}: getBtc`);
    const btcApp = new Btc({ transport: transportRef.current });
    const pathObj = generateBtcPath(1);
    console.log(`Current timestamp ${Date.now()} pathObj: `, pathObj);

    const addressObj: any = {};
    for (let index = 0; index < Object.entries(pathObj).length; index++) {
      const [k, v] = Object.entries(pathObj)[index];
      console.log(`Current timestamp ${Date.now()} k, v: `, k, v);
      const { path, format } = v;
      const address = await btcApp.getWalletPublicKey(path, { format });
      addressObj[k] = address;
    }

    console.table(addressObj)
  };

  const signMessageWithSolana = async () => {
    const message = 'hello world'
    const bufferMsg = Buffer.from(message)
    const solanaApp = new Solana(transportRef.current);
    try {
      const ret = await solanaApp.signOffchainMessage("44'/501'/0'", bufferMsg)
      console.log(`Current timestamp ${Date.now()} ret: `, ret)
    } catch (error) {
      // console.log(error)
      // i will get an errir like that
      // {
      //   "name": "TransportStatusError",
      //   "message": "Ledger device: UNKNOWN_ERROR (0x6a81)",
      //   "stack": "Error\n    at new TransportStatusError (chrome-extension://pefhooljjcjhffmdjfmlpileleebiglf/js/onboarding.js:8884:18)\n    at TransportWebHID.<anonymous> (chrome-extension://pefhooljjcjhffmdjfmlpileleebiglf/js/onboarding.js:18225:39)\n    at step (chrome-extension://pefhooljjcjhffmdjfmlpileleebiglf/js/onboarding.js:18139:23)\n    at Object.next (chrome-extension://pefhooljjcjhffmdjfmlpileleebiglf/js/onboarding.js:18120:53)\n    at fulfilled (chrome-extension://pefhooljjcjhffmdjfmlpileleebiglf/js/onboarding.js:18111:58)",
      //   "statusCode": 27265,
      //   "statusText": "UNKNOWN_ERROR"
      // }
    }
  }

  let keystoneSDK:any = null
  // useEffect(() => {
  //   keystoneSDK = new KeystoneSDK()
  // }, [])

  const onSucceed = ({type, cbor}) => {
    const account = KeystoneSDK.parseHDKey(new UR(Buffer.from(cbor, "hex"), type))
    console.log("account: ", account);
  }
  const onError = (errorMessage) => {
    console.log("error: ",errorMessage);
  }


//   const onSucceed = ({type, cbor}) => {
//     const multiAccounts = KeystoneSDK.parseMultiAccounts(new UR(Buffer.from(cbor, "hex"), type))
//     console.log("multiAccounts: ", multiAccounts);
// }
// const onError = (errorMessage) => {
//     console.log("error: ",errorMessage);
// }



  return (
    <div>
      <button onClick={getEth}>getEth</button>

      <button onClick={getBtc}>getBtc</button>

      <button onClick={signMessageWithSolana}>signMessageWithSolana</button>

      <h2> 打开控制台吧靓仔 ~ </h2>

      <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.CryptoHDKey]} />

      {/* <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.CryptoMultiAccounts]} /> */}
    </div>
  );
};

export default App;
