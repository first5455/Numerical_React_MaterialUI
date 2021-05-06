const math = require("mathjs");
const AlgebraLatex = require("algebra-latex");
const convert = (fn, inputx) => {
    /* convert latex to math */
  const latexInput = fn;
  let latexrepacle = latexInput.replace('\\exp',' exp')
  latexrepacle = latexrepacle.replaceAll("ln","log")
  const algebraObj = new AlgebraLatex().parseLatex(latexrepacle);
  let text = algebraObj.toMath();
  /* format exp string for mathjs */
  const textreplace = text.replace('exp*x','exp(x)');
  let scope = { x: inputx };
  let ans = math.evaluate(textreplace, scope);
  return ans;
};

export { convert };
