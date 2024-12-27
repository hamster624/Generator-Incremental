let points = ExpantaNum(0);

const generators = [
    { count: ExpantaNum(1), cost: ExpantaNum(100), prod: ExpantaNum(0), costMult: ExpantaNum(1.5) },
    { count: ExpantaNum(0), cost: ExpantaNum(200), prod: ExpantaNum(0), costMult: ExpantaNum(2) },
    { count: ExpantaNum(0), cost: ExpantaNum(1000000), prod: ExpantaNum(0), costMult: ExpantaNum(3) },
    { count: ExpantaNum(0), cost: ExpantaNum(1e17), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e105"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e2900"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e2.2e5"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e5.04e9"), prod: ExpantaNum(0), costMult: ExpantaNum(100) },
    { count: ExpantaNum(0), cost: ExpantaNum("1e4e10"), prod: ExpantaNum(0), costMult: ExpantaNum(1000) },
];

function applyUpgrades() {
    generators[0].prod = generators[0].count.pow(ExpantaNum(5).pow(upgrades.gen1Boost1).pow(ExpantaNum(25).pow(upgrades.gen1Boost2)));
    if (upgrades.gen1Boost3.gt(0)) {
        generators[0].prod = generators[0].prod.pow(generators[0].count.slog().pow(upgrades.gen1Boost3));
    }
}

function buyGenerator(id) {
    const gen = generators[id - 1];
    if (points.gte(gen.cost)) {
        points = points.sub(gen.cost);
        gen.count = gen.count.add(1);
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
                gen.prod = ExpantaNum(gen.count);
            } else {
                gen.prod = gen.count.pow(ExpantaNum(3).pow(i));
            }
            if (i === 0) {
                gen.prod = gen.prod.pow(ExpantaNum(3).pow(upgrades.gen1Boost1));
                gen.prod = gen.prod.pow(ExpantaNum(2).pow(upgrades.gen1Boost2));
            } else if (i === 1) {
                gen.prod = gen.prod.pow(ExpantaNum(12).pow(upgrades.gen2Boost1));
                gen.prod = gen.prod.pow(ExpantaNum(5).pow(upgrades.gen2Boost2));
            }
        }

        if (i === 0 && upgrades.gen1Boost3.gt(0)) {
            const boostFactor = ExpantaNum.max(gen.count.log10().tetrate(1.03), 1);
            gen.prod = gen.prod.pow(boostFactor);
        }

        applyTranscendBoosts();

        if (i === 0) {
            points = points.add(gen.prod);
        } else {
            generators[i - 1].count = generators[i - 1].count.add(gen.prod);
        }
    }
}

function render() {
    const notationFunc = useAltNotation ? notateAlt : notate;
    document.getElementById('points').innerText = notationFunc(points, 2);
    
    generators.forEach((gen, i) => {
        document.getElementById(`gen${i + 1}prod`).innerText = notationFunc(ExpantaNum(gen.prod.mul(10)), 2);
        document.getElementById(`gen${i + 1}count`).innerText = notationFunc(gen.count, 2);
        document.getElementById(`gen${i + 1}cost`).innerText = notationFunc(gen.cost, 2);
    });
    if (upgrades.gen1Boost3.eq(1)) {
        document.getElementById('gen1Boost3Button').disabled = true;
        document.getElementById('gen1Boost3Button').innerText = "Buy";
    }
}

function formatNumberWithCommas(num) {
    if (num > 1e12) {
        return num.toString();
    }
    let [integerPart, decimalPart] = num.toString().split('.');
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimalPart) {
        decimalPart = decimalPart.replace(/0+$/, '');
        return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
    }
    return integerPart;
}

function notate(expnum, fp) {
    const exp = ExpantaNum(expnum);
    if (exp.slog(10).gte(5)) {
        return exp.toHyperE();
    }
    if (exp.lt("1e12")) {
        return formatNumberWithCommas(exp.toNumber().toFixed(fp));
    } else if (exp.slog(10).lt(1000000000000000) && exp.slog(10).gte(1.5)) {
        return exp.toExponential(fp);
    } else if (exp.lt("10^^1000000000000000")) {
        return "10^^" + notate(exp.slog(10));
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

function notateAlt(expnum, fp) {
    const exp = ExpantaNum(expnum);
    if (exp.slog(10).gte(5)) {
        return exp.toHyperE();
    }
    if (exp.lt("1e9")) {
        return formatNumberWithCommas(exp.toNumber().toFixed(fp));
    } else if (exp.slog(10).lt(1.5)) {
        return exp.toExponential(fp);
    } else if (exp.slog().gt(3.4)) {
        return "10^^" + exp.slog(10).toFixed(fp);
    } else if (exp.slog(10).lt(1e15)) {
        return "e" + exp.log10().toFixed(fp);
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
function obfuscateData(str) {
    const shift = Math.floor(Math.random() * 256);
    let obfuscated = '';
    for (let i = 0; i < str.length; i++) {
        obfuscated += String.fromCharCode(str.charCodeAt(i) + shift);
    }
    return { obfuscatedData: obfuscated, shift: shift };
}

function deobfuscateData(obfuscatedData, shift) {
    let deobfuscated = '';
    for (let i = 0; i < obfuscatedData.length; i++) {
        deobfuscated += String.fromCharCode(obfuscatedData.charCodeAt(i) - shift);
    }
    return deobfuscated;
}

function toBase64(str) {
    try {
        const uint8Array = new TextEncoder().encode(str);
        let base64String = '';
        for (let i = 0; i < uint8Array.length; i++) {
            base64String += String.fromCharCode(uint8Array[i]);
        }
        return btoa(base64String);
    } catch (error) {
        console.error("Error during Base64 encoding:", error);
        return null;
    }
}

function fromBase64(base64) {
    try {
        const decodedData = atob(base64);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }
        return new TextDecoder().decode(uint8Array);
    } catch (error) {
        console.error("Error during Base64 decoding:", error);
        return null;
    }
}

function saveGame() {
    const saveData = {
        points: points.toString(),
        clickerScore: clickerScore.toString(),
        generators: generators.map(gen => ({
            count: gen.count.toString(),
            cost: gen.cost.toString(),
            prod: gen.prod.toString(),
            costMult: gen.costMult.toString(),
            upgrades: (gen.upgrades || []).map(upgrade => upgrade.level.toString())
        })),
        rebirthPoints: rebirthPoints.toString(),
        hasRebirthed: hasRebirthed,
        hasTranscended: hasTranscended,
        upgrades: Object.fromEntries(
            Object.entries(upgrades).map(([key, value]) => [key, value.toString()])
        ),
        transcendPoints: transcendPoints.toString(),
        transcendBoosts: {
            boost1: transcendBoosts.boost1,
            boost2: transcendBoosts.boost2
        },
        playtime: playtime.toString(),
        memoryGame: {
            cards: memoryGameState.cards.map(card => ({
                value: card.value,
                matched: card.matched
            })),
            flippedCards: memoryGameState.flippedCards,
            matchedPairs: memoryGameState.matchedPairs,
            totalPairs: memoryGameState.totalPairs
        },
        unlockedResets: {
            rebirthUnlocked: hasRebirthed,
            transcendUnlocked: hasTranscended,
        }
    };

    let saveDataString = JSON.stringify(saveData);
    let { obfuscatedData, shift } = obfuscateData(saveDataString);
    const encodedSave = toBase64(obfuscatedData);
    if (encodedSave) {
        const saveWithShift = JSON.stringify({ data: encodedSave, shift: shift });
        localStorage.setItem('gameSave', saveWithShift);
    } else {
        console.error("Failed to save game due to encoding issues.");
    }
}

function loadGame() {
    const saveObjectStr = localStorage.getItem('gameSave');
    if (saveObjectStr) {
        try {
            const saveObject = JSON.parse(saveObjectStr);
            let decodedData = fromBase64(saveObject.data);
            let shift = saveObject.shift;
            if (!decodedData) {
                console.error("Failed to decode the save data correctly.");
                return;
            }
            let saveDataString = deobfuscateData(decodedData, shift);
            const saveData = JSON.parse(saveDataString);
            points = ExpantaNum(saveData.points);
            clickerScore = ExpantaNum(saveData.clickerScore || 0);

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
            hasRebirthed = saveData.hasRebirthed;
            hasTranscended = saveData.hasTranscended;
            Object.entries(saveData.upgrades).forEach(([key, value]) => {
                upgrades[key] = ExpantaNum(value);
            });
            transcendBoosts = saveData.transcendBoosts || {
                boost1: false,
                boost2: false
            };
            transcendPoints = ExpantaNum(saveData.transcendPoints || 0);
            if (transcendPoints.isNaN()) {
                transcendPoints = ExpantaNum(0);
            }
            transcendBaseCost = ExpantaNum(saveData.transcendBaseCost || "1ee120");
            if (saveData.unlockedResets) {
                hasRebirthed = saveData.unlockedResets.rebirthUnlocked;
                if (transcendPoints.gte(ExpantaNum("1ee120"))) {
                    transcendBoosts.boost1 = true;
                }
            }

            applyUpgrades();
            renderRebirth();
            renderTranscend();

            playtime = Number(saveData.playtime);
            if (isNaN(playtime)) {
                playtime = 0;
            }
            if (saveData.memoryGame) {
                memoryGameState.cards = saveData.memoryGame.cards.map(card => ({
                    value: card.value,
                    matched: card.matched
                }));
                memoryGameState.flippedCards = saveData.memoryGame.flippedCards;
                memoryGameState.matchedPairs = saveData.memoryGame.matchedPairs;
                memoryGameState.totalPairs = saveData.memoryGame.totalPairs;
            } else {
                resetMemoryGameState();
            }

            updateStatsOverlay();
            updateRebirthSection();
        } catch (error) {
            console.error("Failed to load game save:", error);
        }
    }
}

const initialGeneratorCosts = generators.map(gen => gen.cost);

function resetGame() {
    if (confirm("Are you sure you want to reset your progress?")) {
        const rebirthSection = document.getElementById("rebirthSection");
        const transcendSection = document.getElementById("transcendSection");
        if (rebirthSection) {
            rebirthSection.style.display = "none";
        }
        if (transcendSection) {
            transcendSection.style.display = "none";
        }
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
        hasRebirthed = false;
        hasTranscended = false;
        transcendPoints = ExpantaNum(0);
        transcendBoosts = {
            boost1: false,
            boost2: false
        };
        transcendBaseCost = ExpantaNum("1ee120");
        clickerScore = 0;
        playtime = 0;
        lastUpdateTime = performance.now();
        render();
        renderRebirth();
        renderTranscend();
    }
}
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
    
    const statsOverlay = document.getElementById("stats-overlay");
    if (statsOverlay) {
        statsOverlay.style.position = 'absolute';
        statsOverlay.style.right = '-300px';
    }
    
    const minigamesButton = document.getElementById("openMenuButton");
    if (minigamesButton) {
        minigamesButton.style.position = 'absolute';
        minigamesButton.style.left = '-100px';
    }
    const savebutton = document.getElementById("SaveButton");
    if (savebutton) {
        savebutton.style.position = 'absolute';
        savebutton.style.left = '-100px';
    }
    const loadButton = document.getElementById("loadButton");
    if (loadButton) {
        loadButton.style.position = 'absolute';
        loadButton.style.left = '-100px';
    }
    const transcend = document.getElementById("transcendButton");
    if (transcend) {
        transcend.style.position = 'absolute';
        transcend.style.top = '1550px';
    }
    
    const rebirth = document.getElementById("rebirthButton");
    if (rebirth) {
        rebirth.style.position = 'absolute';
        rebirth.style.top = '1600px';
    }    
    const calculator = document.getElementById("calculatorButton");
    if (calculator) {
        calculator.style.position = 'absolute';
        calculator.style.left = '-100px';
    }
}

  
  window.onload = () => {
    showDeviceModal();
  };
  
  let playtime = 0;
  let lastUpdateTime = performance.now();
  
  function formatTime(seconds) {
      const days = ExpantaNum.floor(seconds / 86400);
      const hours = ExpantaNum.floor((seconds % 86400) / 3600);
      const minutes = ExpantaNum.floor((seconds % 3600) / 60);
      const secs = ExpantaNum.floor(seconds % 60);
      const ms = ExpantaNum.floor((seconds % 1) * 1000);
  
      return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }
  
  function updateStatsOverlay() {
      const currentTime = performance.now();
      playtime += (currentTime - lastUpdateTime) / 1000;
      lastUpdateTime = currentTime;
  
      document.getElementById("overlay-points").textContent = `${document.getElementById("points").textContent}`;
      document.getElementById("overlay-rebirth-points").textContent = `${document.getElementById("rebirthPoints").textContent}`;
      document.getElementById("overlay-transcend-points").textContent = `${document.getElementById("transcendPoints").textContent}`;
      document.getElementById("overlay-playtime").textContent = `Playtime: ${formatTime(playtime)}`;
  }
  
  setInterval(updateStatsOverlay, 1);
  function toggleGuide() {
    const guide = document.getElementById('guide');
    guide.style.display = guide.style.display === 'block' ? 'none' : 'block';
  }
  
  function toggleSection(section) {
    const content = document.getElementById(section);
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }
  
setInterval(() => {
    update();
    render();
    renderRebirth();
    renderTranscend();
    updateRebirthSection();
    updateTranscendSection();
}, 100);

loadGame();

setInterval(() => {
    saveGame();
}, 1000);
