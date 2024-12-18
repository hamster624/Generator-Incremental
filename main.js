let points = ExpantaNum(0);

const generators = [
    { count: ExpantaNum(1), cost: ExpantaNum(100), prod: ExpantaNum(0), costMult: ExpantaNum(1.5) },
    { count: ExpantaNum(0), cost: ExpantaNum(2000), prod: ExpantaNum(0), costMult: ExpantaNum(2) },
    { count: ExpantaNum(0), cost: ExpantaNum(10000000), prod: ExpantaNum(0), costMult: ExpantaNum(3) },
    { count: ExpantaNum(0), cost: ExpantaNum(1e17), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e105"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e2900"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e2.2e5"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e5.04e9"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e4e10"), prod: ExpantaNum(0), costMult: ExpantaNum(1000) },
];

function applyUpgrades() {
    generators[0].prod = generators[0].count.tetrate(ExpantaNum(1.0000005).pow(upgrades.gen1Boost1).tetrate(ExpantaNum(1.000005).pow(upgrades.gen1Boost2)));
    if (upgrades.gen1Boost3.gt(0)) {
        generators[0].prod = generators[0].prod.pow(generators[0].count.slog().pow(upgrades.gen1Boost3));
    }
}

function buyGenerator(id) {
    const gen = generators[id - 1];
    if (points.gte(gen.cost)) {
        points = points.sub(gen.cost);
        gen.count = gen.count.add(1);
        gen.prod = gen.prod.add(ExpantaNum(1.05));
        gen.cost = gen.cost.pow(gen.costMult);
        applyUpgrades();
        render();
    }
}

function update() {
    for (let i = 0; i < generators.length; i++) {
        let gen = generators[i];
        
        if (gen.count.eq(0)) {
            gen.prod = ExpantaNum(0);
        } else {
            if (i === 0) {
                gen.prod = gen.count;
            } else {
                gen.prod = gen.count.pow(ExpantaNum(3).pow(i));
            }
            if (i === 0) {
                gen.prod = gen.prod.tetrate(ExpantaNum(1.0000005).tetrate(upgrades.gen1Boost1));
                gen.prod = gen.prod.tetrate(ExpantaNum(1.000005).tetrate(upgrades.gen1Boost2));
            } else if (i === 1) {
                gen.prod = gen.prod.tetrate(ExpantaNum(1.00000025).tetrate(upgrades.gen2Boost1));
                gen.prod = gen.prod.tetrate(ExpantaNum(1.000001).tetrate(upgrades.gen2Boost2));
            }
        }

        if (i === 0 && upgrades.gen1Boost3.gt(0)) {
            const boostFactor = ExpantaNum.max(gen.count.log10().tetrate(1.15), 1);
            gen.prod = gen.prod.pow(boostFactor);
        }

        if (i === 0) {
            points = points.add(gen.prod);
        } else {
            generators[i - 1].count = generators[i - 1].count.add(gen.prod);
        }
    }
}

function formatNumberWithCommas(num) {
    return num.toLocaleString();
}

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

function render() {
    const notationFunc = useAltNotation ? notateAlt : notate;
    document.getElementById('points').innerText = notationFunc(points, 5);
    
    generators.forEach((gen, i) => {
        document.getElementById(`gen${i + 1}prod`).innerText = notationFunc(gen.prod, 2);
        document.getElementById(`gen${i + 1}count`).innerText = notationFunc(gen.count, 2);
        document.getElementById(`gen${i + 1}cost`).innerText = notationFunc(gen.cost, 5);
    });
    if (upgrades.gen1Boost3.eq(1)) {
        document.getElementById('gen1Boost3Button').disabled = true;
        document.getElementById('gen1Boost3Button').innerText = "Buy";
    }
}

function notateAlt(expnum, fp) {
    const exp = ExpantaNum(expnum);
    if (exp.lt("1e9")) {
        return formatNumberWithCommas(exp.toNumber().toFixed(fp));
    } else if (exp.slog(10).lt(1.5)) {
        return formatNumberWithCommas(exp.toExponential(fp));
    } else if (exp.slog().gt(3.4)) {
        return "10^^" + exp.slog(10).toFixed(fp);
    } else if (exp.slog(10).lt(1e15)) {
        return "1e" + exp.log10().toFixed(fp);
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

let useAltNotation = false;

function toggleNotation() {
    useAltNotation = !useAltNotation;
}

function saveGame() {
    const saveData = {
        points: points.toString(),
        generators: generators.map(gen => ({
            count: gen.count.toString(),
            cost: gen.cost.toString(),
            prod: gen.prod.toString(),
            costMult: gen.costMult.toString(),
            upgrades: (gen.upgrades || []).map(upgrade => upgrade.level.toString())
        })),
        rebirthPoints: rebirthPoints.toString(),
        upgrades: Object.fromEntries(
            Object.entries(upgrades).map(([key, value]) => [key, value.toString()])
        )
    };
    const saveDataString = JSON.stringify(saveData);
    const encodedSave = btoa(saveDataString);
    localStorage.setItem('gameSave', encodedSave);
}

function loadGame() {
    const encodedSave = localStorage.getItem('gameSave');
    if (encodedSave) {
        try {
            const saveDataString = atob(encodedSave);
            const saveData = JSON.parse(saveDataString);
            points = ExpantaNum(saveData.points);
            generators.forEach((gen, i) => {
                gen.count = ExpantaNum(saveData.generators[i].count);
                gen.cost = ExpantaNum(saveData.generators[i].cost);
                gen.prod = ExpantaNum(saveData.generators[i].prod);
                gen.costMult = ExpantaNum(saveData.generators[i].costMult);
                if (!saveData.generators[i].upgrades) {
                    saveData.generators[i].upgrades = [];
                }
                saveData.generators[i].upgrades.forEach((level, index) => {
                    if (!gen.upgrades[index]) {
                        gen.upgrades[index] = { level: ExpantaNum(0) };
                    }
                    gen.upgrades[index].level = ExpantaNum(level);
                });
            });
            rebirthPoints = ExpantaNum(saveData.rebirthPoints);
            Object.entries(saveData.upgrades).forEach(([key, value]) => {
                upgrades[key] = ExpantaNum(value);
            });
            applyUpgrades();
            renderRebirth();
        } catch (error) {
            console.error("Failed to load game save:", error);
        }
    }
}
const initialGeneratorCosts = generators.map(gen => gen.cost);

function resetGame() {
    if (confirm("Are you sure you want to reset your progress?")) {
        localStorage.removeItem('gameSave');
        points = ExpantaNum(0);
        generators.forEach((gen, index) => {
            gen.count = ExpantaNum(0);
            gen.prod = ExpantaNum(0);
            gen.cost = initialGeneratorCosts[index];
        });
        generators[0].count = ExpantaNum(1);
        rebirthPoints = ExpantaNum(0);
        upgrades = {
            gen1Boost1: ExpantaNum(0),
            gen2Boost1: ExpantaNum(0),
            gen1Boost2: ExpantaNum(0),
            gen2Boost2: ExpantaNum(0),
            gen1Boost3: ExpantaNum(0),
        };
        render();
        renderRebirth();
    }
}
// Modal HTML insertion
const notationModalHTML = `
<div id="notationModal" class="modal" style="display: none; position: fixed; z-index: 1000; inset-block-start: 0; inset-inline-start: 0; inline-size: 100%; block-size: 100%; background-color: rgba(0, 0, 0, 0.8);">
  <div class="modal-content" style="background-color: black; margin: 10% auto; padding: 20px; border: 1px solid #888; inline-size: 80%; max-inline-size: 600px; box-sizing: border-box;">
    <span class="close-btn" onclick="closeNotationGuide()" style="color: #aaa; float: inline-end; font-size: 28px; font-weight: bold;">×</span>
    <h2>Notation Guide</h2>
    <p>E100#2#3#2 (hyper-e notation) represents E100^E100 which is the first step (E100#2). Then after you get the result you do result^result^result (E100#2#3) and then that result^that result.</p>
    <p>If you see stuff like (#1^4) it just means #1#1#1#1. </p>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', notationModalHTML);

// Function to open the modal
function openNotationGuide() {
    const modal = document.getElementById('notationModal');
    modal.style.display = 'block';  // Ensure it's displayed
}

// Function to close the modal
function closeNotationGuide() {
    const modal = document.getElementById('notationModal');
    modal.style.display = 'none';   // Hide when closed
}
// Button to open the modal
const openModalButton = document.createElement('button');
openModalButton.innerText = "Open Notation Guide";
openModalButton.onclick = openNotationGuide;
openModalButton.style.position = 'fixed';
openModalButton.style.top = '100px';
openModalButton.style.left = '10px';
openModalButton.style.backgroundColor = 'black';
openModalButton.style.color = 'white';
openModalButton.style.border = '1px solid white';

document.body.appendChild(openModalButton);

function showDeviceModal() {
    const modal = document.createElement('div');
    modal.classList.add('grayscale');
  
    modal.innerHTML = `
      <div class="device-modal" style="background-color: black; padding: 20px; border-radius: 10px; inline-size: 300px; margin: auto; text-align: center; position: fixed; inset-block-start: 50%; inset-inline-start: 50%; transform: translate(-50%, -50%); z-index: 10000;">
        <h2>Are you on a PC?</h2>
        <button onclick="setDeviceType('pc')" style="background: black; color: white; border: 1px solid white; padding: 10px; margin: 5px; cursor: pointer;">Yes, I'm on PC</button>
        <button onclick="setDeviceType('not-pc')" style="background: black; color: white; border: 1px solid white; padding: 10px; margin: 5px; cursor: pointer;">No, I'm not on PC (sets scale to 0.5)</button>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
  
  function setDeviceType(type) {
    const modal = document.querySelector('.grayscale');
    modal.remove();
  
    if (type === 'not-pc') {
      changeScale(0.5);
      adjustForNonPC();
    }
  }
  
  function changeScale(factor) {
    document.body.style.transform = `scale(${factor})`;
  }
  
  function adjustForNonPC() {
    document.body.style.fontSize = '14px';
  }
  
  window.onload = () => {
    showDeviceModal();
  };
  
function updateStatsOverlay() {
    document.getElementById("overlay-points").textContent = document.getElementById("points").textContent;
    document.getElementById("overlay-rebirth-points").textContent = document.getElementById("rebirthPoints").textContent;
}

setInterval(updateStatsOverlay, 100);

setInterval(() => {
    update();
    render();
    renderRebirth();
}, 100);

loadGame();

setInterval(() => {
    saveGame();
}, 5000);