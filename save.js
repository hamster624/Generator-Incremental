document.addEventListener('DOMContentLoaded', () => {
    // Add Save Button
    const saveButton = document.createElement('button');
    saveButton.innerText = "Copy Save";
    saveButton.style.position = 'fixed';
    saveButton.style.top = '300px';
    saveButton.style.left = '10px';
    saveButton.style.backgroundColor = 'black';
    saveButton.style.color = 'white';
    saveButton.style.border = '1px solid white';
    saveButton.onclick = copyGameSave;

    document.body.appendChild(saveButton);

    // Add Load Button
    const loadButton = document.createElement('button');
    loadButton.innerText = "Load Save";
    loadButton.style.position = 'fixed';
    loadButton.style.top = '150px';
    loadButton.style.left = '10px';
    loadButton.style.backgroundColor = 'black';
    loadButton.style.color = 'white';
    loadButton.style.border = '1px solid white';
    loadButton.onclick = loadGameSave;

    document.body.appendChild(loadButton);

    // Copy Save to Clipboard
    function copyGameSave() {
        const saveData = localStorage.getItem("gameSave");
        if (saveData) {
            const encryptedSave = btoa(saveData); // Encrypt using Base64
            navigator.clipboard.writeText(encryptedSave).then(() => {
                alert("Game save copied to clipboard!");
            }).catch(err => {
                alert("Failed to copy save: " + err);
            });
        } else {
            alert("No game save found in localStorage.");
        }
    }

    // Load Save from Clipboard
    function loadGameSave() {
        const userInput = prompt("Paste your encrypted save here:");
        if (userInput) {
            try {
                const decryptedSave = atob(userInput); // Decrypt using Base64
                localStorage.setItem("gameSave", decryptedSave);

                alert("Game save loaded successfully!");
                
                // Reload game state (or refresh the page to apply the new save)
                if (typeof loadGame === "function") {
                    loadGame(JSON.parse(decryptedSave)); // Update game state directly if loadGame is available
                } else {
                    location.reload(); // Fallback to reload the page if no loadGame function exists
                }
            } catch (err) {
                alert("Invalid save data.");
            }
        }
    }
});
