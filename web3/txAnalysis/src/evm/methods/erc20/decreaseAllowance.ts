import analyse from "../../analyse";

const main = async () => {
  const result = await analyse({
    from: "0xE7b03D2078C71A41283B545d8F380369A5728888",
    to: "0x9c9E0966eA1f72121cC4C1bdD2F28CE791F64296",
    data: "0xa457c2d70000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000005f5e100",
    value: "0x0",
  });

  console.log(result);
};

main();
