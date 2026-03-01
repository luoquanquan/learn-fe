import { getTronWeb, toSun } from '../utils'
import analyse from '../analyse'

const main = async () => {
  // const tronWeb = getTronWeb()

  // const transaction = await tronWeb.transactionBuilder.sendTrx(
  //   'TQ7UoUXsbk75xnV6MKDktnEobraWFHNmHw',
  //   toSun(1),
  //   'TQaDeqUhxTyWZeXejtZvYPet3J2r3VBoqE'
  // )

  // console.log(JSON.stringify(transaction, null, 2))

  const result = await analyse({
    visible: false,
    txID: '96450f14f203ed78d364875006161142fc43baa6eeef07fc52be3425a6da0523',
    raw_data_hex:
      '0a022ca422083e66ad209b1a6ce840f88ed2fdc8335a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a1541a030dd0437ae2eb5eb8cd1e1ee365a63e5f629dc1215419b2247304b015613dac1d467325e50f049a60afc18c0843d7098bacefdc833',
    raw_data: {
      contract: [
        {
          parameter: {
            value: {
              to_address: '419b2247304b015613dac1d467325e50f049a60afc',
              owner_address: '41a030dd0437ae2eb5eb8cd1e1ee365a63e5f629dc',
              amount: 1000000
            },
            type_url: 'type.googleapis.com/protocol.TransferContract'
          },
          type: 'TransferContract'
        }
      ],
      ref_block_bytes: '2ca4',
      ref_block_hash: '3e66ad209b1a6ce8',
      expiration: 1771937499000,
      timestamp: 1771937439000
    }
  })
  console.log(`Current log: result: `, result)
}

main()

// {
//   visible: false,
//   txID: '1215a31320030d16f8bc047c818dc6e9d5e345fd906de6dd8e4deec735aa88b0',
//   raw_data: {
//     contract: [
//       {
//         parameter: {
//           value: {
//             data: '0xa9059cbb00000000000000000000000071bb98dcb405c17b29606535557d45c04268df6b000000000000000000000000000000000000000000000000000000003b9aca00',
//             owner_address: '4174abc9551f8612370c9d7b29b03f661254385a9a',
//             contract_address: '41a614f803b6fd780986a42c78ec9c7f77e6ded13c'
//           },
//           type_url: 'type.googleapis.com/protocol.TriggerSmartContract'
//         },
//         type: 'TriggerSmartContract'
//       }
//     ],
//     ref_block_bytes: 'f639',
//     ref_block_hash: '098e286d200aec9d',
//     expiration: 1724298690000,
//     fee_limit: 100000000,
//     timestamp: 1724298632603
//   },
//   raw_data_hex:
//     '0a0242fc2208f3ff07a6b20a7b0640e8fcbd909c325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541cb3966acc1d471ad25e52330d6dea71c00fa1ab8121541a614f803b6fd780986a42c78ec9c7f77e6ded13c2244d73dd6230000000000000000000000003487b63d30b5b2c87fb7ffa8bcfade38eaac1abe0000000000000000000000000000000000000000000000000000000005f5e10070cbb4ba909c32900180c2d72f'
// }
