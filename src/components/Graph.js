import { React, useEffect } from "react";
import Desmos from "desmos";

function Graph({latex}) {
  useEffect(() => {
    var elt = document.getElementById("calculator");
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      expressions: false,
      settingsMenu: false,
    });
    calculator.setExpression({ id: "graph1", latex: `${latex}` });
    return () => {
      calculator.destroy();
    };
  }, [latex]);
  return (
    <div>
      <div id="calculator" style={{ width: 600, height: 600 }}></div>
    </div>
  );
}
export default Graph;
