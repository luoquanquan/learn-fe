import analyse from "../../analyse";

// const transferNativeToken = () => {
//   return analyse({
//     from: '0xE7b03D2078C71A41283B545d8F380369A5728888',
//     to: '0xe7b03d2078c71a41283b545d8f380369a5728888',
//     data: '0x',
//     value: '0x12'
//   })
// }

const transferToken = () => {
  return analyse({
    from: "0xE7b03D2078C71A41283B545d8F380369A5728888",
    to: "0x9c9E0966eA1f72121cC4C1bdD2F28CE791F64296",
    data: "0xa9059cbb000000000000000000000000fe8dc6394501a35ad1c4833f40f382e55dada4f300000000000000000000000000000000000000000000000000000000000f4240",
    value: "0x0",
  });
};

const main = async () => {
  // const result = await transferNativeToken()
  const result = await transferToken();
  console.log(JSON.stringify(result, null, 2));
};

main();
