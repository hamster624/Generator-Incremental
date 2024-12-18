let rebirthPoints = ExpantaNum(0);
let upgrades = {
    gen1Boost1: ExpantaNum(0),
    gen2Boost1: ExpantaNum(0),
    gen1Boost2: ExpantaNum(0),
    gen2Boost2: ExpantaNum(0),
    gen1Boost3: ExpantaNum(0),
};

const rebirthThreshold = ExpantaNum("1e7.169e16");

function calculateRebirthPoints() {
    return ExpantaNum(points.slog()).sqrt().sqrt();
}

function rebirth() {
    if (points.lt(rebirthThreshold)) {
        return;
    }

    const gainedPoints = calculateRebirthPoints();
    if (gainedPoints.gt(0)) {
        rebirthPoints = rebirthPoints.add(gainedPoints);
        points = ExpantaNum(0);
        generators.forEach((gen, index) => {
            gen.count = index === 0 ? ExpantaNum(1) : ExpantaNum(0);
            gen.prod = ExpantaNum(0);
            gen.cost = initialGeneratorCosts[index];
        });
        applyUpgrades();
        renderRebirth();
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
            Boost Per Level: +^^${boostPerLevel}<br>
            Total Boost: +^^${totalBoost}
        `;
        infoElement.style.display = 'block';
    }
}

function getUpgradeCost(upgrade) {
    const costs = {
        gen1Boost1: ExpantaNum(1).add(upgrades.gen1Boost1),
        gen2Boost1: ExpantaNum(1).add(upgrades.gen2Boost1),
        gen1Boost2: upgrades.gen1Boost1.gte(1) ? ExpantaNum(3) : "Requires gen1Boost1",
        gen2Boost2: upgrades.gen2Boost1.gte(1) ? ExpantaNum(3) : "Requires gen2Boost1",
        gen1Boost3: upgrades.gen1Boost3.gte(1) ? ExpantaNum(10).times(0) : ExpantaNum(10),
    };
    return costs[upgrade];
}

function getBoostPerLevel(upgrade) {
    if (upgrade === 'gen1Boost1') return 1.0000005;
    if (upgrade === 'gen2Boost1') return 1.00000025;
    if (upgrade === 'gen1Boost2') return 1.0000005;
    if (upgrade === 'gen2Boost2') return 1.000001;
    if (upgrade === 'gen1Boost3') {
        return ExpantaNum.max(gen.count.log10().tetrate(1.15), 1);
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

function saveRebirthData() {
    const saveData = {
        rebirthPoints: rebirthPoints.toString(),
        upgrades: Object.fromEntries(
            Object.entries(upgrades).map(([key, value]) => [key, value.toString()])
        ),
    };
    localStorage.setItem('rebirthData', JSON.stringify(saveData));
}

function loadRebirthData() {
    const saveData = JSON.parse(localStorage.getItem('rebirthData'));
    if (saveData) {
        rebirthPoints = ExpantaNum(saveData.rebirthPoints);
        Object.entries(saveData.upgrades).forEach(([key, value]) => {
            upgrades[key] = ExpantaNum(value);
        });
        applyUpgrades();
    }
}

function renderRebirth() {
    const rebirthPointsElement = document.getElementById('rebirthPoints');
    if (rebirthPointsElement) {
        rebirthPointsElement.innerText = notate(rebirthPoints, 2);
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

setupUpgradeButtons();
