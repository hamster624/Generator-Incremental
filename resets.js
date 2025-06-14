let rebirthPoints = ExpantaNum(0);
let transcendPoints = ExpantaNum(0);
let hasRebirthed = false;
let hasTranscended = false;

let upgrades = {
    gen1Boost1: ExpantaNum(0),
    gen2Boost1: ExpantaNum(0),
    gen1Boost2: ExpantaNum(0),
    gen2Boost2: ExpantaNum(0),
    gen1Boost3: ExpantaNum(0),
};

const rebirthThreshold = ExpantaNum("1e7.169e16");

function calculateRebirthPoints() {
    const rebirthPointsGain = points.log10().log10().ln().sqrt();
    return rebirthPointsGain.isNaN() ? ExpantaNum(0) : rebirthPointsGain;
}


function rebirth() {
    if (points.lt(rebirthThreshold) && !hasRebirthed) {
        return;
    }

    const gainedPoints = calculateRebirthPoints();
    if (gainedPoints.gt(0)) {
        rebirthPoints = rebirthPoints.add(gainedPoints);
        points = ExpantaNum(1);
        generators.forEach((gen, index) => {
            gen.count = index === 0 ? ExpantaNum(1) : ExpantaNum(0);
            gen.prod = ExpantaNum(0);
            gen.cost = initialGeneratorCosts[index];
            hasRebirthed = true;
        });
        applyUpgrades();
        renderRebirth();
        saveGame();
    }
}
function updateRebirthSection() {
    const rebirthButton = document.getElementById("rebirthButton");
    const rebirthGainElement = document.getElementById("rebirthGain");
    
    if (points.gte(rebirthThreshold) || hasRebirthed || hasTranscended) {
        const gainedPoints = calculateRebirthPoints();
        rebirthButton.innerText = `Rebirth (Gain: ${notate(gainedPoints, 2)} points)`;
        rebirthButton.style.backgroundColor = "#5cb85c";
        rebirthButton.disabled = false;
        if (rebirthGainElement) {
            rebirthGainElement.innerText = `You will gain: ${notate(gainedPoints, 2)} rebirth points.`;
        }
    } else {
        rebirthButton.innerText = "Locked (req: 1e7.169e16)";
        rebirthButton.style.backgroundColor = "#333";
        rebirthButton.disabled = true;
        if (rebirthGainElement) {
            rebirthGainElement.innerText = "You will gain: 0 points.";
        }
    }
}


function toggleUpgradeInfo(upgrade) {
    const infoElement = document.getElementById(`${upgrade}Info`);
    const isInfoVisible = infoElement.style.display === 'block';
    if (isInfoVisible) {
        infoElement.style.display = 'none';
    } else {
        const level = upgrades[upgrade].toString();
        const cost = getUpgradeCost(upgrade).toString();
        const boostPerLevel = getBoostPerLevel(upgrade);
        const totalBoost = ExpantaNum(boostPerLevel).pow(upgrades[upgrade]).toString();
        infoElement.innerHTML = ` 
            <strong>Upgrade Info:</strong><br>
            Level: ${level}<br>
            Cost: ${cost} Rebirth Points<br>
            Boost Per Level: *^${boostPerLevel}<br>
            Total Boost: *^${totalBoost}
        `;
        infoElement.style.display = 'block';
    }
}

function getUpgradeCost(upgrade) {
    const costs = {
        gen1Boost1: ExpantaNum(1).add(upgrades.gen1Boost1),
        gen2Boost1: ExpantaNum(1).add(upgrades.gen2Boost1),
        gen1Boost2: upgrades.gen1Boost1.gte(1) ? ExpantaNum(3).times(ExpantaNum(2).pow(upgrades.gen1Boost2)) : "Requires gen1Boost1",
        gen2Boost2: upgrades.gen2Boost1.gte(1) ? ExpantaNum(3).times(ExpantaNum(2).pow(upgrades.gen2Boost2)) : "Requires gen2Boost1",
        gen1Boost3: upgrades.gen1Boost3.gte(1) ? ExpantaNum(10).times(0) : ExpantaNum(10),
    };
    return costs[upgrade];
}

function getBoostPerLevel(upgrade) {
    if (upgrade === 'gen1Boost1') return 3;
    if (upgrade === 'gen2Boost1') return 2;
    if (upgrade === 'gen1Boost2') return 12;
    if (upgrade === 'gen2Boost2') return 5;
    if (upgrade === 'gen1Boost3') {
        return ExpantaNum.max(gen.count.log10().tetrate(1.03), 1);
    }
    return 1;
}

function buyUpgrade(key, upgradeCost) {
    if (rebirthPoints.gte(upgradeCost) && !(typeof upgradeCost === "string")) {
        rebirthPoints = rebirthPoints.minus(upgradeCost);
        upgrades[key] = upgrades[key].plus(1);
        applyUpgrades();
        render();
    } else {
        const infoElement = document.getElementById(`${key}Info`);
        if (infoElement) {
            if (typeof upgradeCost === "string") {
                infoElement.innerText = upgradeCost;
                infoElement.style.display = 'block';
            } else {
                infoElement.style.display = 'none';
            }
        }
    }
}

function renderRebirth() {
    const rebirthPointsElement = document.getElementById('rebirthPoints');
    if (rebirthPointsElement) {
        rebirthPointsElement.innerText = notate(rebirthPoints, 6);
    }

    Object.entries(upgrades).forEach(([key, value]) => {
        const boostElement = document.getElementById(`${key}Level`);
        if (boostElement) {
            boostElement.innerText = `Level: ${value.toString()}`;
        }

        const upgradeCost = getUpgradeCost(key);
        const costElement = document.getElementById(`${key}Cost`);
        if (costElement) {
            if (upgradeCost instanceof ExpantaNum) {
                costElement.innerText = `Cost: ${notate(upgradeCost, 2)} Rebirth Points`;
            } else {
                costElement.innerText = `Cost: ${upgradeCost}`;
            }
        }

        const button = document.getElementById(`${key}Button`);
        if (button) {
            button.disabled = rebirthPoints.lessThan(upgradeCost);
            button.onclick = () => buyUpgrade(key, upgradeCost);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const upgradeBoard = document.getElementById('upgradeBoard');
    if (upgradeBoard) {
        upgradeBoard.style.display = 'none';
    }
});

function toggleUpgradeBoard() {
    const upgradeBoard = document.getElementById('upgradeBoard');
    const toggleButton = document.getElementById('toggleBoardButton');
    if (upgradeBoard.style.display === 'none') {
        upgradeBoard.style.display = 'block';
        toggleButton.innerText = 'Close Upgrade Board';
    } else {
        upgradeBoard.style.display = 'none';
        toggleButton.innerText = 'Open Upgrade Board';
    }
}

function setupUpgradeButtons() {
    Object.keys(upgrades).forEach(upgradeKey => {
        const button = document.getElementById(`${upgradeKey}Button`);
        if (button) {
            button.addEventListener('click', () => buyUpgrade(upgradeKey));
        }
    });
}

let transcendBoosts = {
    boost1: false,
    boost2: false,
};

function getBoost1Value() {
    if (!transcendBoosts.boost1) return ExpantaNum(0);
    return ExpantaNum(points.slog().factorial().pow(transcendPoints).pow(2));
}

function getBoost2Value() {
    if (!transcendBoosts.boost2) return ExpantaNum(1);
    return ExpantaNum(points.log10().pow(transcendPoints.tetr(1.75)));
}

function unlockTranscendBoost1() {
    if (transcendPoints.gte(ExpantaNum(1))) {
        transcendBoosts.boost1 = true;
    }
}

function unlockTranscendBoost2() {
    if (transcendPoints.gte(ExpantaNum(500))) {
        transcendBoosts.boost2 = true;
    }
}

function applyTranscendBoosts() {
    if (transcendBoosts.boost1) {
        const boost1Factor = getBoost1Value();
        generators[0].prod = points.pow(boost1Factor);
    }

    if (transcendBoosts.boost2) {
        const boost2Factor = getBoost2Value();
        generators[0].prod = generators[0].prod.pow(boost2Factor);
    }
}

function transcend() {
    const transcendThreshold = ExpantaNum("1ee120");
    if (points.lt(transcendThreshold)) {
        return;
    }    

    const gainedPoints = points.slog().sqrt();
    if (gainedPoints.gt(0)) {
        transcendPoints = transcendPoints.add(gainedPoints);
        points = ExpantaNum(1);

        generators.forEach((gen, index) => {
            gen.count = ExpantaNum(index === 0 ? 1 : 0);
            gen.prod = ExpantaNum(0);
            gen.cost = initialGeneratorCosts[index];
        });

        rebirthPoints = ExpantaNum(0);
        Object.keys(upgrades).forEach(key => {
            upgrades[key] = ExpantaNum(0);
        });

        unlockTranscendBoost1();
        unlockTranscendBoost2();
        applyTranscendBoosts();
        hasTranscended = true;
        renderTranscend();
    }
}

function renderTranscend() {
    const transcendPointsElement = document.getElementById('transcendPoints');
    const boost1StatusElement = document.getElementById('boost1Status');
    const boost2StatusElement = document.getElementById('boost2Status');
    const boost1FormulaElement = document.getElementById('boost1Formula');
    const boost2FormulaElement = document.getElementById('boost2Formula');
    const boost1ValueElement = document.getElementById('boost1Value');
    const boost2ValueElement = document.getElementById('boost2Value');

    if (transcendPointsElement) {
        transcendPointsElement.innerText = `Transcend Points: ${notate(transcendPoints, 2)}`;
    }

    if (boost1StatusElement) {
        boost1StatusElement.innerText = transcendBoosts.boost1
            ? "Boost 1: Active"
            : "Boost 1: Locked (Requires 1 Transcend Point)";
    }

    if (boost2StatusElement) {
        boost2StatusElement.innerText = transcendBoosts.boost2
            ? "Boost 2: Active"
            : "Boost 2: Locked (Requires 500 Transcend Points)";
    }

    if (boost1FormulaElement) {
        boost1FormulaElement.innerText = "Formula: boost gen1 prod by ^((factorial(slog(points))) ^ transcendPoints ) ^ 2";
    }

    if (boost2FormulaElement) {
        boost2FormulaElement.innerText = "Formula: boost gen1 prod by ^log(points^(transcend^^1.75))";
    }

    if (boost1ValueElement) {
        boost1ValueElement.innerText = `Current Boost: ${notate(getBoost1Value())}`;
    }

    if (boost2ValueElement) {
        boost2ValueElement.innerText = `Current Boost: ${notate(getBoost2Value())}`;
    }

    const transcendButton = document.getElementById('transcendButton');
    if (transcendButton) {
        transcendButton.disabled = points.lt(ExpantaNum("1ee120"));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const transcendButton = document.getElementById('transcendButton');
    if (transcendButton) {
        transcendButton.onclick = transcend;
    }
});
function updateTranscendSection() {
    const transcendButton = document.getElementById("transcendButton");
    const transcendGainElement = document.getElementById("transcendGain");
    
    if (points.gte(ExpantaNum("1ee120")) || hasTranscended) {
        const gainedPoints = points.slog().sqrt();
        transcendButton.innerText = `Transcend (Gain: ${notate(gainedPoints)} points)`;
        transcendButton.style.backgroundColor = "#5cb85c";
        transcendButton.disabled = false;
        if (transcendGainElement) {
            transcendGainElement.innerText = `You will gain: ${notate(gainedPoints)} transcend points.`;
        }
    } else {
        transcendButton.innerText = "Locked (req: 1ee120)";
        transcendButton.style.backgroundColor = "#333";
        transcendButton.disabled = true;
        if (transcendGainElement) {
            transcendGainElement.innerText = "You will gain: 0 points.";
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateTranscendSection();
});