// This calculator is made by me if you want to check it out here is the link:https://hamster624.github.io/ExpantaNum-Calculator/
document.addEventListener('DOMContentLoaded', function() {
  const calculatorHTML = `
      <div id="calculatormenu" style="display: none; position: fixed; inset-block-start: 20%; inset-inline-start: 20%; inline-size: 400px; background: black; color: white; border: 1px solid white; padding: 20px; z-index: 1000; max-block-size: 80vh; overflow-y: auto;">
          <h3 style="text-align: center;">Calculator</h3>
          <input id="num1" type="text" placeholder="Enter number 1" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
          <input id="num2" type="text" placeholder="Enter number 2" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
            <div class="input-group">
              <label for="arrowCount">Number of Arrows:</label>
              <input type="text" id="arrowCount" value="5" min="1" />
              <button onclick="performOperation('Arrows')">Arrow Operation</button>
            </div>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-block-end: 10px;">
          <button onclick="performOperation('add')"> Add (+)</button>
          <button onclick="performOperation('subtract')"> Subtract (-)</button>
          <button onclick="performOperation('multiply')"> Multiply (×)</button>
          <button onclick="performOperation('divide')"> Divide (÷)</button>
          <button onclick="performOperation('exponentiate')"> Exponent (^) </button>
          <button onclick="performOperation('tetrate')">Tetrate (^^)</button>
          <button onclick="performOperation('pentate')">Pentate (^^^)</button>
          <button onclick="performOperation('hexate')">Hexate (^^^^)</button>
          <button onclick="performOperation('factorial')">factorial</button>
          <button onclick="performOperation('sqrt')">Sqrt √</button>
          <button onclick="performOperation('cbrt')">Cbrt ∛</button>
          <button onclick="performOperation('log')">log</button>
          <button onclick="performOperation('ln')">ln</button>
          <button onclick="performOperation('logb')">log Base (num2 is base)</button>
          <button onclick="performOperation('slog')">slog</button>
          <button onclick="performOperation('2slog')"> double slog</button>
          <button onclick="performOperation('custom_sqrt')"> custom sqrt (num2 is root amount)</button>
          <button onclick="performOperation('ssqrt')"> ssqrt</button>
          <button onclick="performOperation('expansion')"> Expansion? idk</button>
          </div>
          <p>Result: <span id="result" style="color: lime;">N/A</span></p>
          <button onclick="closeCalculator()" style="inline-size: 90%; background: black; color: white; border: 1px solid white;">Close</button>
      </div>
  `;

  document.body.insertAdjacentHTML("beforeend", calculatorHTML);
  let E = ExpantaNum;
  let lastOperation = null;
  window.performOperation = function(operation) {
    const num1Str = document.getElementById("num1").value.replace(/,/g, '');
    const num2Str = document.getElementById("num2").value.replace(/,/g, '');
    const arrowCountInput = document.getElementById('arrowCount');
    const arrowCount = E(arrowCountInput.value);
    const num1 = E(num1Str);
    const num2 = E(num2Str);
    let result;

      switch (operation) {
          case 'add': result = num1.add(num2); break;
          case 'subtract': result = num1.sub(num2); break;
          case 'multiply': result = num1.mul(num2); break;
          case 'divide': result = num1.div(num2); break;
          case 'exponentiate': result = num1.pow(num2); break;
          case 'tetrate': result = num1.tetr(num2); break;
          case 'pentate': result = num1.pentate(num2); break;
          case 'hexate': result = num1.hexate(num2); break;
          case 'factorial': result = num1.factorial(); break;
          case 'sqrt': result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(2)); break;
          case 'cbrt': result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(3)); break;
          case 'log': result = num1.log10(); break;
          case 'ln': result = num1.log(); break;
          case 'slog': result = num1.slog(); break;
          case '2slog': result = num1.slog().slog(); break;
          case 'logb': result = num1.logBase(num2); break;
          case 'custom_sqrt': result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(num2)); break;
          case 'ssqrt': result = num1.ssqrt(); break;
          case 'expansion': result = ExpantaNum.expansion(num1,num2); break;
          case 'Arrows': result = ExpantaNum.arrow(num1,arrowCount,num2); break;
      }

    document.getElementById("result").textContent = `${format(result, 2)}`;
    lastOperation = { operation, num1: num1Str, num2: num2Str };
  }

  window.openCalculator = function() {
      document.getElementById("calculatormenu").style.display = "block";
  };

  window.closeCalculator = function() {
      document.getElementById("calculatormenu").style.display = "none";
  };


    function repeatLastOperation() {
      setInterval(() => {
        if (lastOperation) {
          performOperation(lastOperation.operation);
        }
      }, 100);
    }

    repeatLastOperation();
    const calculatorButtonHTML = `
    <button id="calculatorButton" onclick="openCalculator()" style="position: fixed; inset-block-start: 10px; inset-inline-start: 10px; background: black; color: white; border: 1px solid white; padding: 10px; z-index: 1000;">
        Calculator
    </button>
`;
document.body.insertAdjacentHTML("beforeend", calculatorButtonHTML);
});
