document.addEventListener('DOMContentLoaded', function() {
    let adminPanelOpen = false;

    window.toggleAdminPanel = function() {
        const adminPanel = document.getElementById('adminPanel');
        adminPanelOpen = !adminPanelOpen;
        adminPanel.style.display = adminPanelOpen ? 'block' : 'none';
    };

    window.modifyValue = function() {
        const selectedOption = document.getElementById('adminOption').value;
        const inputValue = ExpantaNum(document.getElementById('adminInput').value || 0);
        
        if (selectedOption.startsWith('gen')) {
            const genIndex = parseInt(selectedOption.replace('gen', '')) - 1;
            if (generators[genIndex]) {
                generators[genIndex].count = generators[genIndex].count.add(inputValue);
            }
        } else if (selectedOption === 'rebirthPoints') {
            rebirthPoints = rebirthPoints.add(inputValue);
        }
        render();
    };

    const adminPanelHTML = `
        <div id="adminPanel" style="display: none; position: fixed; inset-block-start: 20%; inset-inline-start: 10%; background: black; color: white; border: 1px solid white; padding: 20px; z-index: 1000;">
            <h3>Admin Panel</h3>
            <select id="adminOption" style="background: black; color: white; border: 1px solid white;">
                <option value="gen1">Gen1</option>
                <option value="gen2">Gen2</option>
                <option value="gen3">Gen3</option>
                <option value="gen4">Gen4</option>
                <option value="gen5">Gen5</option>
                <option value="gen6">Gen6</option>
                <option value="gen7">Gen7</option>
                <option value="gen8">Gen8</option>
                <option value="gen9">Gen9</option>
                <option value="rebirthPoints">Rebirth Points</option>
            </select>
            <input id="adminInput" type="text" placeholder="Enter amount" style="background: black; color: white; border: 1px solid white;" />
            <button onclick="modifyValue()" style="background: black; color: white; border: 1px solid white; margin-block-start: 10px;">Apply</button>
            <button onclick="toggleAdminPanel()" style="background: black; color: white; border: 1px solid white; margin-inline-start: 10px;">Close</button>
        </div>
        <button onclick="toggleAdminPanel()" style="position: fixed; inset-block-start: 50px; inset-inline-start: 10px; background: black; color: white; border: 1px solid white;">Admin Panel</button>
    `;

    document.body.insertAdjacentHTML('beforeend', adminPanelHTML);
});
