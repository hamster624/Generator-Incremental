document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.createElement('button');
    saveButton.innerText = "Copy Save";
    saveButton.style.position = 'fixed';
    saveButton.style.top = '150px';
    saveButton.style.left = '10px';
    saveButton.style.backgroundColor = 'black';
    saveButton.style.color = 'white';
    saveButton.style.border = '1px solid white';
    saveButton.onclick = copyGameSave;

    document.body.appendChild(saveButton);

    const loadButton = document.createElement('button');
    loadButton.innerText = "Load Save";
    loadButton.style.position = 'fixed';
    loadButton.style.top = '100px';
    loadButton.style.left = '10px';
    loadButton.style.backgroundColor = 'black';
    loadButton.style.color = 'white';
    loadButton.style.border = '1px solid white';
    loadButton.onclick = loadGameSave;

    document.body.appendChild(loadButton);

    function copyGameSave() {
        const saveData = localStorage.getItem("gameSave");
        if (saveData) {
            const encryptedSave = btoa(saveData);
            navigator.clipboard.writeText(encryptedSave).then(() => {
                alert("Game save copied to clipboard!");
            }).catch(err => {
                alert("Failed to copy save: " + err);
            });
        } else {
            alert("No game save found in localStorage.");
        }
    }

    function loadGameSave() {
        const userInput = prompt("Paste your encrypted save here:");
        if (userInput) {
            try {
                const decryptedSave = atob(userInput);
                localStorage.setItem("gameSave", decryptedSave);

                alert("Game save loaded successfully!");

                if (typeof loadGame === "function") {
                    loadGame(JSON.parse(decryptedSave));
                } else {
                    location.reload();
                }
            } catch (err) {
                alert("Invalid save data.");
            }
        }
    }
});
