document.addEventListener('DOMContentLoaded', function() {
    const calculatorHTML = `
        <div id="calculator" style="display: none; position: fixed; inset-block-start: 20%; inset-inline-start: 20%; inline-size: 400px; background: black; color: white; border: 1px solid white; padding: 20px; z-index: 1000;">
            <h3 style="text-align: center;">Calculator</h3>
            <input id="num1" type="text" placeholder="Enter number 1" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
            <input id="num2" type="text" placeholder="Enter number 2" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-block-end: 10px;">
                <button onclick="performOperation('add')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Add</button>
                <button onclick="performOperation('subtract')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Subtract</button>
                <button onclick="performOperation('multiply')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Multiply</button>
                <button onclick="performOperation('divide')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Divide</button>
                <button onclick="performOperation('exponentiate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Exponentiate</button>
                <button onclick="performOperation('tetrate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Tetrate</button>
                <button onclick="performOperation('pentate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Pentate</button>
                <button onclick="performOperation('hexate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Hexate</button>
                <button onclick="performOperation('heptate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Heptate</button>
                <button onclick="performOperation('octate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Octate</button>
                <button onclick="performOperation('nonate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Nonate</button>
                <button onclick="performOperation('decate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Decate</button>
                <button onclick="performOperation('unodecate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Unodecate</button>
                <button onclick="performOperation('dodecate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Dodecate</button>
                <button onclick="performOperation('tridocate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Tridocate</button>
                <button onclick="performOperation('quadocate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Quadocate</button>
                <button onclick="performOperation('quindecate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Quindecate</button>
                <button onclick="performOperation('sedecate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Sedecate</button>
                <button onclick="performOperation('septendecate')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Septendecate</button>
                <button onclick="performOperation('factorial')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Factorial</button>
                <button onclick="performOperation('sqrt')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Square Root</button>
                <button onclick="performOperation('log')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Log Base 10</button>
                <button onclick="performOperation('slog')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Super Logarithm</button>
                <button onclick="performOperation('logb')" style="inline-size: 30%; background: black; color: white; border: 1px solid white;">Log Base (num2)</button>
            </div>
            <p>Result: <span id="result" style="color: lime;">N/A</span></p>
            <button onclick="closeCalculator()" style="inline-size: 90%; background: black; color: white; border: 1px solid white;">Close</button>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", calculatorHTML);
    let E = ExpantaNum;
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
                    result = num1.hexate(num2);
                    break;
                case 'heptate':
                    result = num1.heptate(num2);
                    break;
                case 'octate':
                    result = num1.octate(num2);
                    break;
                case 'nonate':
                    result = num1.nonate(num2);
                    break;
                case 'decate':
                    result = num1.decate(num2);
                    break;
                case 'unodecate':
                    result = num1.unodecate(num2);
                    break;
                case 'dodecate':
                    result = num1.dodecate(num2);
                    break;
                case 'tridocate':
                    result = num1.tridocate(num2);
                    break;
                case 'quadocate':
                    result = num1.quadocate(num2);
                    break;
                case 'quindecate':
                    result = num1.quindecate(num2);
                    break;
                case 'sedecate':
                    result = num1.sedecate(num2);
                    break;
                case 'septendecate':
                    result = num1.septendecate(num2);
                    break;
                case 'factorial':
                    result = num1.factorial();
                    break;
                case 'sqrt':
                    result = num1.sqrt();
                    break;
                case 'log':
                    result = num1.log10();
                    break;
                case 'slog':
                    result = num1.slog();
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

    const calculatorButtonHTML = `
        <button onclick="openCalculator()" style="position: fixed; inset-block-start: 10px; inset-inline-start: 10px; background: black; color: white; border: 1px solid white; padding: 10px; z-index: 1000;">
            Open Calculator
        </button>
    `;
    document.body.insertAdjacentHTML("beforeend", calculatorButtonHTML);
});
