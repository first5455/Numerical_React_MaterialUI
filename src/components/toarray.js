import { BigNumber } from "bignumber.js";
const toarray = (indata) => {
  let output = [];
  console.log(indata);
  for (let i = 0; i < indata.length; i++) {
    let temp = [];
    for (let j = 0; j < indata[0].length; j++) {
      temp[j] = new BigNumber(parseFloat(indata[i][j]));
    }
    output[i] = temp;
  }
  return output;
};

export { toarray };
