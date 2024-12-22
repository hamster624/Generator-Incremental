// This calculator is made by me if you want to check it out here is the link:https://hamster624.github.io/Calculator/
document.addEventListener('DOMContentLoaded', function() {
    const calculatorHTML = `
        <div id="calculator" style="display: none; position: fixed; inset-block-start: 20%; inset-inline-start: 20%; inline-size: 400px; background: black; color: white; border: 1px solid white; padding: 20px; z-index: 1000;">
            <h3 style="text-align: center;">Calculator</h3>
            <input id="num1" type="text" placeholder="Enter number 1" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
            <input id="num2" type="text" placeholder="Enter number 2" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-block-end: 10px;">
<button onclick="performOperation('add')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Add (+)</button>
<button onclick="performOperation('subtract')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Subtract (-)</button>
<button onclick="performOperation('multiply')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Multiply (×)</button>
<button onclick="performOperation('divide')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Divide (÷)</button>

<button onclick="performOperation('exponentiate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Exponent (^) </button>
<button onclick="performOperation('tetrate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Tetrate (^^)</button>
<button onclick="performOperation('pentate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Pentate (^^^)</button>
<button onclick="performOperation('hexate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Hexate (^^^^)</button>

<button onclick="performOperation('heptate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Heptate (5*^)</button>
<button onclick="performOperation('octate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Octate (6*^)</button>
<button onclick="performOperation('nonate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Nonate (7*^)</button>
<button onclick="performOperation('decate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Decate (8*^)</button>

<button onclick="performOperation('unodecate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Unodecate (9*^)</button>
<button onclick="performOperation('dodecate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Dodecate (10*^)</button>
<button onclick="performOperation('tridocate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Tridocate (11*^)</button>
<button onclick="performOperation('quadocate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Quadocate (12*^)</button>

<button onclick="performOperation('quindecate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Quindecate (13*^)</button>
<button onclick="performOperation('sedecate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Sedecate (14*^)</button>
<button onclick="performOperation('septendecate')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Septendecate (15*^)</button>
<button onclick="performOperation('1000arrow')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">1,000*^</button>

<button onclick="performOperation('10000arrow')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">10,000*^</button>
<button onclick="performOperation('100000arrow')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">100,000*^</button>
<button onclick="performOperation('1000000arrow')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">1,000,000*^</button>
<button onclick="performOperation('factorial')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Factorial</button>

<button onclick="performOperation('sqrt')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Sqrt √</button>
<button onclick="performOperation('log')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Log Base 10</button>
<button onclick="performOperation('logb')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Log Base (num2 is base)</button>
<button onclick="performOperation('slog')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Super Logarithm</button>

<button onclick="performOperation('2slog')" style="inline-size: 25%; background: black; color: white; border: 1px solid white; padding: 5px;">Double Slog</button>

            </div>
            <p>Result: <span id="result" style="color: lime;">N/A</span></p>
            <button onclick="closeCalculator()" style="inline-size: 90%; background: black; color: white; border: 1px solid white;">Close</button>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", calculatorHTML);
    let E = ExpantaNum;
    let lastOperation = null;
    window.performOperation = function(operation) {
        const num1Str = document.getElementById("num1").value;
        const num2Str = document.getElementById("num2").value;

        const num1 = E(num1Str || 0);
        const num2 = E(num2Str || 0);
        let result;

        try {
            switch (operation) {
                case 'add':
                    result = num1.add(num2);
                    break;
                  case 'subtract':
                    result = num1.sub(num2);
                    break;
                  case 'multiply':
                    result = num1.mul(num2);
                    break;
                  case 'divide':
                    result = num1.div(num2);
                    break;
                  case 'exponentiate':
                    result = num1.pow(num2);
                    break;
                  case 'tetrate':
                    result = num1.tetr(num2);
                    break;
                  case 'pentate':
                    result = num1.pentate(num2);
                    break;
                  case 'hexate':
                    result = num1.hexate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'heptate':
                    result = num1.heptate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'octate':
                    result = num1.octate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'nonate':
                    result = num1.nonate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'decate':
                    result = num1.decate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'unodecate':
                    result = num1.unodecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'dodecate':
                    result = num1.dodecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'tridocate':
                    result = num1.tridocate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'quadocate':
                    result = num1.quadocate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'quindecate':
                    result = num1.quindecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'sedecate':
                    result = num1.sedecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'septendecate':
                    result = num1.septendecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case '1000arrow':
                    result = num1.big(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case '10000arrow':
                    result = num1.big2(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case '100000arrow':
                    result = num1.big3(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case '1000000arrow':
                    result = num1.big4(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
                    break;
                  case 'factorial':
                    result = num1.factorial();
                    break;
                  case 'sqrt':
                    result = num1.sqrt();
                    break;
                  case 'log':
                    result = num1.log10(num2);
                    break;
                  case 'slog':
                    result = num1.slog();
                    break;
                  case '2slog':
                    result = num1.slog().slog();
                    break;
                  case 'logb':
                    result = num2.logBase(num1);
                    break;
                default:
                    result = "Invalid Operation";
            }
        } catch (error) {
            result = "Error: " + error.message;
        }

        document.getElementById("result").textContent = notate(result, 6);
    };

    window.openCalculator = function() {
        document.getElementById("calculator").style.display = "block";
    };

    window.closeCalculator = function() {
        document.getElementById("calculator").style.display = "none";
    };
    function notate(expnum, fp) {
        const exp = ExpantaNum(expnum);
        if (exp.lt("1e12")) {
          return formatNumberWithCommas(exp.toNumber().toFixed(fp));
        } else if (exp.slog(10).lt(1000000000000000) && exp.slog(10).gte(1.5)) {
          return formatNumberWithCommas(exp.toExponential(fp));
        } else if (exp.lt("10^^1000000000000000")) {
          return "10^^" + notate(exp.slog(10), fp);
        } else {
          let str = exp.toHyperE();
          str = str.replace(/#0/g, '');
          str = str.replace(/(#1)+/g, (match, p1) => {
            const repeatCount = match.length / p1.length;
            if (repeatCount === 1) {
              return '';
            }
            return `(#1^${repeatCount})`;
          });
          return str;
        }
      }
      
      function formatNumberWithCommas(num) {
        return num.toLocaleString();
      }
      
      function repeatLastOperation() {
        setInterval(() => {
          if (lastOperation) {
            performOperation(lastOperation.operation);
          }
        }, 100);
      }
      
      repeatLastOperation();
    const calculatorButtonHTML = `
        <button onclick="openCalculator()" style="position: fixed; inset-block-start: 10px; inset-inline-start: 10px; background: black; color: white; border: 1px solid white; padding: 10px; z-index: 1000;">
            Open Calculator
        </button>
    `;
    document.body.insertAdjacentHTML("beforeend", calculatorButtonHTML);
});
