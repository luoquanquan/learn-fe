import { createPublicClient, http, defineChain } from "viem";
import { polygon } from "viem/chains";

// const customChain = defineChain({
//   id: 1337,
//   name: 'Custom Chain',
//   nativeCurrency: {
//     name: 'Ether',
//     symbol: 'ETH',
//     decimals: 18
//   },
//   rpcUrls: {
//     default: { http: ['http://127.0.0.1:8545'] }
//   }
// })

const client = createPublicClient({
  chain: polygon,
  transport: http("http://127.0.0.1:8545"),
});

const debugraceCall = (transaction: any): Promise<any> => {
  return client.request({
    method: "debug_traceCall",
    params: [
      transaction,
      "latest",
      {
        tracer: "callTracer",
        tracerConfig: {
          withLog: true,
          onlyTopCall: false,
        },
      },
    ],
  });
};

export default debugraceCall;
