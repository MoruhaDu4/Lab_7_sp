document.addEventListener('DOMContentLoaded', () => {
    const teamForm = document.getElementById('teamForm');
    const teamTableBody = document.getElementById('teamTable').getElementsByTagName('tbody')[0];
    const clearTableButton = document.getElementById('clearTable');
    const clearFormButton = document.getElementById('clearForm');
    let teams = [];
    let editIndex = null;

    teamForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const teamName = document.getElementById('teamName').value;
        const coachName = document.getElementById('coachName').value;
        const stadium = document.getElementById('stadium').value;
        const formation = document.getElementById('formation').value;
        const league = document.getElementById('league').value;
        const points = parseInt(document.getElementById('points').value);
        const wins = parseInt(document.getElementById('wins').value);
        const losses = parseInt(document.getElementById('losses').value);

      
        const totalGames = wins + losses;
        const winPercentage = totalGames ? ((wins / totalGames) * 100).toFixed(2) : 0;

        if (editIndex === null) {
           
            const number = teams.length ? teams[teams.length - 1].number + 1 : 1;
            teams.push({ number, teamName, coachName, stadium, formation, league, points, wins, losses, winPercentage });
        } else {
            
            teams[editIndex] = { ...teams[editIndex], teamName, coachName, stadium, formation, league, points, wins, losses, winPercentage };
            editIndex = null;
        }

        document.getElementById('teamForm').reset();
        renderTable();
    });

    function renderTable() {
        teamTableBody.innerHTML = '';

        teams.forEach((team, index) => {
            const row = teamTableBody.insertRow();

            row.insertCell(0).innerText = team.number;
            row.insertCell(1).innerText = team.teamName;
            row.insertCell(2).innerText = team.coachName;
            row.insertCell(3).innerText = team.stadium;
            row.insertCell(4).innerText = team.formation;
            row.insertCell(5).innerText = team.league;
            row.insertCell(6).innerText = team.points;
            row.insertCell(7).innerText = team.wins;
            row.insertCell(8).innerText = team.losses;
            row.insertCell(9).innerText = team.winPercentage + '%';

            const actionsCell = row.insertCell(10);
            const editButton = document.createElement('button');
            editButton.innerText = 'Редагувати';
            editButton.addEventListener('click', () => editTeam(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Видалити';
            deleteButton.addEventListener('click', () => deleteTeam(index));
            actionsCell.appendChild(deleteButton);
        });
    }

    function editTeam(index) {
        const team = teams[index];
        document.getElementById('teamNumber').value = team.number;
        document.getElementById('teamName').value = team.teamName;
        document.getElementById('coachName').value = team.coachName;
        document.getElementById('stadium').value = team.stadium;
        document.getElementById('formation').value = team.formation;
        document.getElementById('league').value = team.league;
        document.getElementById('points').value = team.points;
        document.getElementById('wins').value = team.wins;
        document.getElementById('losses').value = team.losses;
        editIndex = index;
    }

    function deleteTeam(index) {
        teams.splice(index, 1);
        renderTable();
    }

    clearTableButton.addEventListener('click', () => {
        teams = [];
        renderTable();
    });

    clearFormButton.addEventListener('click', () => {
        teamForm.reset();
        editIndex = null;
    });
});