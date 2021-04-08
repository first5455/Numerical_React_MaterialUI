import { BigNumber } from "bignumber.js";
const toarray = (indata, mode) => {
  let output = [];
  for (let i = 0; i < indata.length; i++) {
    let temp = [];
    for (let j = 0; j < indata[0].length; j++) {
      if (mode === 1) {
        temp[j] =new BigNumber(parseFloat(indata[i][j].value));
      } else {
        temp[j] = parseFloat(indata[i][j].value);
      }
    }
    output[i] = temp;
  }
  return output;
};

export { toarray };
